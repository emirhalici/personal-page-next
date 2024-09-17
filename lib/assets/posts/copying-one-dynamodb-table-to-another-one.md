---
title: Copying one DynamoDB table to another one
date: "2024-09-07"
---

> This post goes over using a Python lambda function to copy contents of a DynamoDB table to another one.

Where I worked we ran into a one-off situation where we needed to copy contents of a table to another table. Basically, we restored an S3 backup to a table and we couldn’t name the imported table what we wanted because that messes up ownership of the table resource. In our case this was important as CDK project must be the owner to continue deploying without issues.

As we looked, our options were AWS Glue or some other AWS overengineered solution that requires a bunch of services to move some contents over. For our use case tables were relatively small so throughput wasn’t a concern. If table size exceeds megabytes then this might not be the solution for you.

What I immidiately though was just piping the information directly to the other table, through any means that’s easy to implement. CLI would probably work the best but I already had a lambda created with permissions to all tables in question I went with that.

---

Deploy the following Python lambda with a high timeout duration and let it do the work for you. To use: replace the table names with what you have and run it once. It is idempotent, so running it multiple times should fine; provided you didn’t modify contents in the meanwhile.

```python
import boto3
import logging
import traceback

SOURCE_TABLE_NAME = ""
TARGET_TABLE_NAME = ""

# Use this if lambda ever errors or times out to start from the last processed data
last_evaluated_index = 0

dynamodb = boto3.resource("dynamodb")


def handler(event, context):
    global last_evaluated_index
    try:
        source_table = dynamodb.Table(SOURCE_TABLE_NAME)
        target_table = dynamodb.Table(TARGET_TABLE_NAME)

        print(f"Scanning source table {SOURCE_TABLE_NAME}")
        all_items = scan_entire_table(source_table.table)
        print(f"Scanned {len(all_items)} items")

        # Use last_evaluated_index to resume from a specific index in case of failure
        with target_table.batch_writer() as batch:
            selected_items_chunk = all_items[last_evaluated_index:]
            for index, item in enumerate(selected_items_chunk, start=last_evaluated_index):
                try:
                    batch.put_item(Item=item)
                    last_evaluated_index = index
                except Exception as e:
                    print(f"Error inserting item at index {index}: {e}")
                    # Update last_evaluated_index to resume later from this index
                    raise e

        return {"statusCode": 200, "body": f"Processed {last_evaluated_index + 1} out of {len(all_items)} items"}
    except BaseException as exception:
        traceback_message = traceback.format_exc()
        logging.error(f"An error occurred:\nError message: {str(exception)}\n{traceback_message}"),
        return {"statusCode": 500}


def scan_entire_table(table):
    all_items = []

    last_evaluated_key = None
    while True:
        scan_kwargs = {}
        if last_evaluated_key:
            scan_kwargs["ExclusiveStartKey"] = last_evaluated_key
        response = table.scan(**scan_kwargs)
        items = response.get("Items", [])
        all_items.extend(items)
        last_evaluated_key = response.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break
    return all_items
```

There might be cases when this lambda fails:

- Table is too big that you hit throughput errors
- Lambda is too slow to process everything in time and it times out
  Updating last_evaluated_index with the last logged index will allow it to continue where it left off.

# Conclusion

This is pretty much it, a straight forward and simplest way to move things to another table. I must warn that for advanced use cases this might not be the best solution, please proceed with caution if dealing with production data!

> This post is also available in [Medium](https://medium.com/@emirhalici/copying-one-dynamodb-table-to-another-one-45d3a6a54bae).
