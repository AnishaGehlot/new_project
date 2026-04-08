from fastapi import FastAPI, Request, Form
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

users = {}
otp_store = {}

# ---------------- EMAIL CONFIG ----------------
EMAIL_ADDRESS = "anisha.m.gehlot@slrtce.in"
EMAIL_PASSWORD = "bmohrtvvfqrzjsds"
# ---------------------------------------------


def send_otp_email(receiver_email: str, otp: str):
    subject = "FLOWLENS Password Reset OTP"
    body = f"""
Hello,

Your FLOWLENS password reset OTP is: {otp}

This OTP is valid for 5 minutes.

Do not share this code with anyone.

- FLOWLENS Team
"""

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = receiver_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    server.sendmail(EMAIL_ADDRESS, receiver_email, msg.as_string())
    server.quit()


@app.get("/")
def welcome(request: Request):
    return templates.TemplateResponse(request, "welcome.html", {})


@app.get("/register")
def register_page(request: Request):
    return templates.TemplateResponse(request, "register.html", {"error": None})


@app.post("/register")
def register_user(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
):
    if password != confirm_password:
        return templates.TemplateResponse(
            request,
            "register.html",
            {"error": "Passwords do not match."},
        )

    if email in users:
        return templates.TemplateResponse(
            request,
            "register.html",
            {"error": "Account already exists with this email."},
        )

    users[email] = {
        "name": f"{first_name} {last_name}",
        "password": password,
    }

    return RedirectResponse(url="/account-created", status_code=303)


@app.get("/account-created")
def account_created(request: Request):
    return templates.TemplateResponse(request, "account_created.html", {})


@app.get("/login")
def login_page(request: Request):
    msg = request.query_params.get("msg")

    success_message = None
    if msg == "reset_success":
        success_message = "Password reset successful. Please login."

    return templates.TemplateResponse(
        request,
        "login.html",
        {
            "error": None,
            "success": success_message
        }
    )


@app.post("/login")
def login_user(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
):
    user = users.get(email)

    if not user or user["password"] != password:
        return templates.TemplateResponse(
            request,
            "login.html",
            {
                "error": "Invalid email or password.",
                "success": None
            },
        )

    return templates.TemplateResponse(
        request,
        "login_success.html",
        {"name": user["name"]},
    )


@app.get("/forgot")
def forgot_page(request: Request):
    return templates.TemplateResponse(request, "forgot.html", {"error": None})


@app.post("/forgot")
def forgot_submit(
    request: Request,
    email: str = Form(...),
):
    if email not in users:
        return templates.TemplateResponse(
            request,
            "forgot.html",
            {"error": "No account found with this email."},
        )

    otp = str(random.randint(1000, 9999))
    expiry = time.time() + 300

    otp_store[email] = {
        "otp": otp,
        "expiry": expiry,
        "verified": False
    }

    try:
        send_otp_email(email, otp)
    except Exception as e:
        return templates.TemplateResponse(
            request,
            "forgot.html",
            {"error": f"Email sending failed: {str(e)}"},
        )

    response = RedirectResponse(url="/verification", status_code=303)
    response.set_cookie(key="reset_email", value=email)
    return response


@app.get("/verification")
def verification_page(request: Request):
    return templates.TemplateResponse(request, "verification.html", {"error": None})


@app.post("/verification")
def verification_submit(
    request: Request,
    otp1: str = Form(...),
    otp2: str = Form(...),
    otp3: str = Form(...),
    otp4: str = Form(...),
):
    email = request.cookies.get("reset_email")

    if not email or email not in otp_store:
        return templates.TemplateResponse(
            request,
            "verification.html",
            {"error": "Session expired. Please try again."},
        )

    entered_otp = f"{otp1}{otp2}{otp3}{otp4}"

    if time.time() > otp_store[email]["expiry"]:
        del otp_store[email]
        return templates.TemplateResponse(
            request,
            "verification.html",
            {"error": "OTP expired. Please request a new code."},
        )

    if entered_otp != otp_store[email]["otp"]:
        return templates.TemplateResponse(
            request,
            "verification.html",
            {"error": "Invalid OTP. Please try again."},
        )

    otp_store[email]["verified"] = True
    return RedirectResponse(url="/reset", status_code=303)


@app.get("/reset")
def reset_page(request: Request):
    email = request.cookies.get("reset_email")

    if not email or email not in otp_store or not otp_store[email]["verified"]:
        return RedirectResponse(url="/forgot", status_code=303)

    return templates.TemplateResponse(request, "reset.html", {"error": None})


@app.post("/reset")
def reset_submit(
    request: Request,
    password: str = Form(...),
    confirm_password: str = Form(...),
):
    email = request.cookies.get("reset_email")

    if not email or email not in otp_store or not otp_store[email]["verified"]:
        return RedirectResponse(url="/forgot", status_code=303)

    if password != confirm_password:
        return templates.TemplateResponse(
            request,
            "reset.html",
            {"error": "Passwords do not match."},
        )

    users[email]["password"] = password
    del otp_store[email]

    response = RedirectResponse(url="/login?msg=reset_success", status_code=303)
    response.delete_cookie("reset_email")
    return response


@app.get("/password-changed")
def password_changed(request: Request):
    return templates.TemplateResponse(
        request,
        "password_changed.html",
        {},
    )


@app.get("/login-success")
def login_success(request: Request):
    return templates.TemplateResponse(
        request,
        "login_success.html",
        {"name": "User"},
    )