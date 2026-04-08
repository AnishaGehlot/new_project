"use client";

import Link from "next/link";
import styles from "../page.module.css";
import loginStyles from "../login/login.module.css";

export default function ForgotPage() {
  return (
    <div className={styles.pageShell}>
      <div className={styles.authLayout}>
        <section className={styles.heroPanel}>
          <div className={styles.heroTop}>
            <div className={styles.brandBadge}>
              <span className={styles.brandDot}></span>
              FLOWLENS
            </div>
          </div>

          <div className={styles.heroCard}>
            <p className={styles.heroEyebrow}>Recovery</p>
            <h1 className={styles.heroTitle}>Forgot your password?</h1>
            <p className={styles.heroSubtitle}>
              {"No worries. We'll send you a secure OTP to reset your password and get you back on track."}
            </p>
            <div className={styles.heroChipRow}>
              <span className={styles.heroChip}>Secure Reset</span>
              <span className={styles.heroChip}>OTP Verified</span>
              <span className={styles.heroChip}>Quick Recovery</span>
            </div>
          </div>
        </section>

        <section className={styles.formPanel}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Reset Password</h2>
              <p className={styles.formSubtitle}>
                Enter your email address and we will send you a verification code.
              </p>
            </div>

            <form>
              <div className={loginStyles.inputGroup}>
                <label className={loginStyles.inputLabel}>Email Address</label>
                <div className={loginStyles.inputWrap}>
                  <input
                    className={loginStyles.textInput}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button className={loginStyles.primaryBtn} type="submit">
                Send Reset Code
              </button>
            </form>

            <div className={loginStyles.bottomNote}>
              Remember your password? <Link href="/login">Login</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
