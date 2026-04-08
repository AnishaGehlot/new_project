import Link from "next/link";
import styles from "./page.module.css";

export default function WelcomePage() {
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
            <p className={styles.heroEyebrow}>Secure Intelligence</p>
            <h1 className={styles.heroTitle}>FLOWLENS</h1>
            <p className={styles.heroSubtitle}>
              Track. Detect. Secure. A premium fraud-monitoring entry experience
              built for digital trust and smarter secure access.
            </p>

            <div className={styles.heroChipRow}>
              <span className={styles.heroChip}>Cyber Security</span>
              <span className={styles.heroChip}>OTP Protected</span>
              <span className={styles.heroChip}>Smart Access</span>
            </div>
          </div>
        </section>

        <section className={styles.formPanel}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Welcome</h2>
              <p className={styles.formSubtitle}>
                Start your FLOWLENS journey with a clean, modern authentication
                flow designed for a professional product experience.
              </p>
            </div>

            <div className={styles.welcomeActions}>
              <Link href="/register" className={styles.primaryLink}>
                Create Account
              </Link>
              <Link href="/login" className={styles.secondaryBtn}>
                Login
              </Link>
            </div>

            <div className={styles.divider}>continue with</div>

            <div className={styles.socialRow}>
              <a className={styles.socialLink} href="#">
                <svg viewBox="0 0 24 24" fill="#EA4335">
                  <path d="M12.24 10.285v3.821h5.445c-.24 1.547-1.8 4.536-5.445 4.536-3.278 0-5.95-2.713-5.95-6.058s2.672-6.058 5.95-6.058c1.868 0 3.118.799 3.836 1.489l2.618-2.52C17.018 3.94 14.863 3 12.24 3 7.42 3 3.5 6.94 3.5 11.584c0 4.645 3.92 8.584 8.74 8.584 5.04 0 8.385-3.542 8.385-8.534 0-.573-.062-1.01-.138-1.35H12.24z" />
                </svg>
              </a>

              <a className={styles.socialLink} href="#">
                <svg viewBox="0 0 24 24" fill="#24292F">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.25 1.84 1.25 1.07 1.84 2.8 1.31 3.49 1 .11-.79.42-1.31.76-1.61-2.66-.31-5.47-1.35-5.47-5.98 0-1.32.47-2.4 1.24-3.25-.12-.31-.54-1.58.12-3.29 0 0 1.01-.33 3.3 1.24a11.3 11.3 0 0 1 6 0c2.28-1.57 3.29-1.24 3.29-1.24.66 1.71.24 2.98.12 3.29.77.85 1.24 1.93 1.24 3.25 0 4.64-2.81 5.67-5.49 5.98.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.58A12 12 0 0 0 12 .5z" />
                </svg>
              </a>

              <a className={styles.socialLink} href="#">
                <svg viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M22 5.92c-.74.33-1.53.55-2.36.64a4.1 4.1 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6.99A4.09 4.09 0 0 0 12 8.09c0 .32.03.64.1.94A11.6 11.6 0 0 1 3.67 4.7a4.08 4.08 0 0 0 1.27 5.46 4.02 4.02 0 0 1-1.85-.51v.05c0 1.98 1.4 3.64 3.27 4.02a4.2 4.2 0 0 1-1.84.07 4.1 4.1 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.58 11.6 11.6 0 0 0 8.29 20.5c7.54 0 11.66-6.25 11.66-11.67 0-.18-.01-.35-.02-.53A8.3 8.3 0 0 0 22 5.92z" />
                </svg>
              </a>

              <a className={styles.socialLink} href="#">
                <svg viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.22.19 2.22.19v2.45h-1.25c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
