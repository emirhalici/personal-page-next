---
title: Unlocking the Power of Python Data Classes w/ Json Serialization
date: "2024-02-18"
---

> Warning: This implementation does not consider nested data class structures.

Python is a great for anyone looking for a dynamically typed language. Although sometimes we do want the static typing experience we are familiar from other languages. This problem can be solved by creating classes in Python such that each property can have a type hint; allowing a better developer experience.

Although this is an option, it isn't very viable when we observe more closely.

```python
class PersonModel:
    def __init__(self, age: int = None, first_name: str = None, last_name: str = None) -> None:
        self.age = age or 20
        self.first_name = first_name or "Brad"
        self.last_name = last_name or "Pitt"

jack = PersonModel()
print(jack) # <__main__.PersonModel object at 0x103059750>
print(jack.age) # 20
print(jack.first_name) # Brad
print(jack.last_name) # Pitt
```

As we can see, to have a class to represent our model of a structure; we need to write a lot of boiler plate to set up variables. Even after all that, equality comparison by value or string representation is yet to be implemented.

## Dataclasses to the Rescue
`dataclasses` module was introduced to Python in 3.7 and has been stable ever since. It includes implementation for comparison, toString and a bunch of other things out of the box.

```python
import dataclasses

@dataclasses.dataclass
class PersonModel:
    age: int = 20
    first_name: str = "Brad"
    last_name: str = "Pitt"

jack = PersonModel()
print(jack) # PersonModel(age=20, first_name='Brad', last_name='Pitt')
print(jack.age) # 20
print(jack.first_name) # Brad
print(jack.last_name) # Pitt

print(PersonModel(first_name="Emir", last_name="Halıcı")==PersonModel()) # False
```

Now we have a great structure type system where we can define our models and use them freely in our project, provided that types are actually what we think they are. Remember: typing/type hints are loose in Python, they are not enforced at all. It is *merely a hint* to the developer, in the *literal* sense that we think it's going to be this type.

Now comes the next problem, how do I construct my models from a JSON payload? Or better yet, how do I convert this to a JSON? Now we are starting to reach the edge of dataclasses support out of the box. There are numerous packages that provide with JSON serialization/deserialization techniques, but we'll use our own implementation for our use case.

My use case was to have a model structure where variables are snake case typed, and json serialization output is camel case typed. Vice versa, json deserialiation input source would be camel case. I did not need any validation on the input as well.

## Json Serialization of Person Model

`dataclasses` module provides a dictionary conversion called `as_dict`. Although it works great output is now in snake cased. To make it work we simply provide a `dict_factory` to convert each field.

```python
import dataclasses
import json

def snake_to_camel(input: str) -> str:
    # Can swap out with more sophisticated implementation if needed
    camel_cased = "".join(x.capitalize() for x in input.lower().split("_"))
    if camel_cased:
        return camel_cased[0].lower() + camel_cased[1:]
    else:
        return camel_cased

@dataclasses.dataclass
class PersonModel:
    age: int = 20
    first_name: str = "Brad"
    last_name: str = "Pitt"

    def to_json(self, include_null=False) -> dict:
        """Converts this to json. Assumes variables are snake cased, converts to camel case.

        Args:
            include_null (bool, optional): Whether null values are included. Defaults to False.

        Returns:
            dict: Json dictionary
        """
        return dataclasses.asdict(
            self,
            dict_factory=lambda fields: {
                snake_to_camel(key): value
                for (key, value) in fields
                if value is not None or include_null
            },
        )

brad = PersonModel()
print(brad) # PersonModel(age=20, first_name='Brad', last_name='Pitt')
print(brad.to_json()) # {'age': 20, 'firstName': 'Brad', 'lastName': 'Pitt'}
```

## Json Deserialization for Person Model

Now that we can convert our model to json, let's work on converting the json to the model. This is a bit more tricky than `to_json` conversion. Constructor for data classes do not accept parameters that aren't actual attributes of class. For e.g: if I were to include `education = "Bachelor's degree"` in the constructor it would throw a runtime error.

Another problem is the optional fields. If each field doesn't have a default value, constructor will require each property to be present. For this exact reason our models all have default value. Without either making them null by default or providing valid default values, json constructor would not work.

```python
import dataclasses
from typing import Type, TypeVar
import re
T = TypeVar("T") # Needed for type inference

def snake_to_camel(input: str) -> str:
    # Can swap out with more sophisticated implementation if needed
    camel_cased = "".join(x.capitalize() for x in input.lower().split("_"))
    if camel_cased:
        return camel_cased[0].lower() + camel_cased[1:]
    else:
        return camel_cased
    
__camel_to_snake_pattern = re.compile(r"(?<!^)(?=[A-Z])")
def camel_to_snake(input: str) -> str:
    return __camel_to_snake_pattern.sub("_", input).lower()

@dataclasses.dataclass
class PersonModel:
    age: int = 20
    first_name: str = "Brad"
    last_name: str = "Pitt"

    def to_json(self, include_null=False) -> dict:
        """Converts this to json. Assumes variables are snake cased, converts to camel case.

        Args:
            include_null (bool, optional): Whether null values are included. Defaults to False.

        Returns:
            dict: Json dictionary
        """
        return dataclasses.asdict(
            self,
            dict_factory=lambda fields: {
                snake_to_camel(key): value
                for (key, value) in fields
                if value is not None or include_null
            },
        )
    
    @classmethod
    def from_json(cls: Type[T], json: dict) -> T:
        """Constructs `this` from given json. Assumes camel case convention is used and converts to camel case.

        Args:
            json (dict): Json dictionary

        Raises:
            ValueError: When `this` isn't a dataclass

        Returns:
            T: New instance
        """
        if not dataclasses.is_dataclass(cls):
            raise ValueError(f"{cls.__name__} must be a dataclass")
        field_names = {field.name for field in dataclasses.fields(cls)}
        kwargs = {
            camel_to_snake(key): value
            for key, value in json.items()
            if camel_to_snake(key) in field_names
        }
        return cls(**kwargs)

older_brad = PersonModel.from_json({'age': 30, 'education': "Bachelor's degree"})
print(older_brad) # PersonModel(age=30, first_name='Brad', last_name='Pitt')
```

## Generic Dataclass

Now that both serialization and deserialization actually work, we can think about how to make this generic to be reusable for all models. Fortunately, inheritance does not interfere with how dataclasses work. So we can provide these utility functions to a class and inherit from it. This way our `PersonModel` does not have any json logic entangled with it.

```python
import dataclasses
import re
from typing import Type, TypeVar, Any, Dict

def snake_to_camel(input: str) -> str:
    camel_cased = "".join(x.capitalize() for x in input.lower().split("_"))
    if camel_cased:
        return camel_cased[0].lower() + camel_cased[1:]
    else:
        return camel_cased

__camel_to_snake_pattern = re.compile(r"(?<!^)(?=[A-Z])")
def camel_to_snake(input: str) -> str:
    return __camel_to_snake_pattern.sub("_", input).lower()

T = TypeVar("T")

class Dataclass:
    """Base class to add json serialization to data classes. Assumes variables are snake cased. Json parsing only works
    when all variables have default values. Otherwise constructor will raise when arguments are missing.

    To use, inherit `Dataclass` and add `@dataclass` annotation
    """

    def to_json(self, include_null=False) -> dict:
        """Converts this to json. Assumes variables are snake cased, converts to camel case.

        Args:
            include_null (bool, optional): Whether null values are included. Defaults to False.

        Returns:
            dict: Json dictionary
        """
        return dataclasses.asdict(
            self,
            dict_factory=lambda fields: {
                snake_to_camel(key): value
                for (key, value) in fields
                if value is not None or include_null
            },
        )

    @classmethod
    def from_json(cls: Type[T], json: dict) -> T:
        """Constructs `this` from given json. Assumes camel case convention is used and converts to camel case.

        Args:
            json (dict): Json dictionary

        Raises:
            ValueError: When `this` isn't a dataclass

        Returns:
            T: New instance
        """
        if not dataclasses.is_dataclass(cls):
            raise ValueError(f"{cls.__name__} must be a dataclass")
        field_names = {field.name for field in dataclasses.fields(cls)}
        kwargs = {
            camel_to_snake(key): value
            for key, value in json.items()
            if camel_to_snake(key) in field_names
        }
        return cls(**kwargs)

@dataclasses.dataclass
class PersonModel(Dataclass):
    age: int = 20
    first_name: str = "Brad"
    last_name: str = "Pitt"

older_brad = PersonModel.from_json({"age": 30, "education": "Bachelor's degree"})
print(older_brad)  # PersonModel(age=30, first_name='Brad', last_name='Pitt')
```

## Conclusion

In this short blog post, we've looked into adding JSON serialization functionality to already existing data classes feature of Python. This is by no means a replacement for existing libraries.

This is just an exploration of how data classes work and be customized. We can also extend the functionality furthermore, like providing `copy_with` method to create a shallow copy of the instance. We're leaving it here as my main goal was to work on JSON serialization part. Thank you very much for following so far!