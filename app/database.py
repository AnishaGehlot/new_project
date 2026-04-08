from passlib.context import CryptContext

# bcrypt ki jagah pbkdf2_sha256 use kiya hai
# isse 72-byte password wala issue nahi aayega
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)