import styles from "./TermsAndConditions.module.css";

function TermsAndConditions() {
  return (
    <div className={styles["container"]}>
      <h1>Terms and Conditions</h1>
      <p>Welcome to Cursor!</p>

      <p>
        These Terms and Conditions govern your use of our blog platform, Cursor,
        accessible from <a href="https://www.cursor.com">www.cursor.com</a>.
      </p>

      <p>
        By accessing or using Cursor, you agree to be bound by these Terms. If
        you do not agree to any part of the terms, then you may not access the
        service.
      </p>

      <h2>1. Accounts</h2>
      <p>
        When you create an account with us, you must provide information that is
        accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of your account on our service.
      </p>

      <h2>2. Blog Content</h2>
      <p>
        Cursor allows users to create and publish blog content. You retain
        ownership of the content you post, but you grant us a non-exclusive,
        worldwide, royalty-free license to use, display, and distribute your
        content on the platform.
      </p>

      <p>
        You are solely responsible for the content you publish. You agree not to
        post any content that is illegal, offensive, defamatory, or infringes on
        any third party's rights.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content provided by Cursor, excluding user-submitted blogs, is the
        intellectual property of Cursor and protected by applicable copyright
        and trademark laws.
      </p>

      <h2>4. User Conduct</h2>
      <p>You agree not to use Cursor to:</p>
      <ul>
        <li>Post or transmit unlawful content</li>
        <li>Spam, phish, or exploit vulnerabilities</li>
        <li>Harass or harm other users</li>
        <li>Use automated systems without our permission</li>
      </ul>

      <h2>5. Termination</h2>
      <p>
        We may suspend or terminate your access immediately, without prior
        notice or liability, if you breach these Terms.
      </p>

      <h2>6. Privacy</h2>
      <p>
        Your use of Cursor is also governed by our{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        . Please review it to understand our data practices.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        Cursor and its team shall not be held responsible for any indirect,
        incidental, special, consequential or punitive damages arising from your
        use of the service.
      </p>

      <h2>8. Modifications to Terms</h2>
      <p>
        We reserve the right to update or change these Terms at any time. We
        will notify users of significant changes. Continued use of the service
        after changes become effective constitutes acceptance of those changes.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms shall be governed in accordance with the laws of the
        jurisdiction in which Cursor operates, without regard to conflict of law
        provisions.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@cursor.com">support@cursor.com</a>.
      </p>
    </div>
  );
} // TermsAndConditions

export default TermsAndConditions;
