from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

hashed = pwd_context.hash("12345678")
print(hashed)

print(
    pwd_context.verify(
        "12345678",
        hashed
    )
)