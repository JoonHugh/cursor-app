import styles from './ReadMe.module.css';

function Readme() {

    return (
      <div className={styles["container"]}>
        <h1 className="text-3xl font-bold mb-4">README: Cursor Blog Application</h1>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">📦 Stack</h2>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Frontend:</strong> React, Tailwind CSS, React Markdown, Markdown Editor</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB (Mongoose)</li>
            <li><strong>Auth:</strong> JWT + bcrypt (password encryption)</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">🧠 Features</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>User Registration & Login</li>
            <li>JWT-based Bearer Authentication</li>
            <li>Create, Update, and Delete Blog Posts</li>
            <li>Markdown Support for Rich Text Content</li>
            <li>Categories, Tags, Featured Posts, and Read Time</li>
            <li>Secure password hashing with bcrypt</li>
            <li>REST API following clean RESTful principles</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">🔐 API Authorization</h2>
          <p className="mt-2">
            All blog-related endpoints are protected using Bearer Tokens. Users can only access or modify their own blogs.
          </p>
          <p className="mt-2">
            Example Header:
            <code className="block bg-gray-100 p-2 mt-2 rounded">Authorization: Bearer &lt;your_token&gt;</code>
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">📬 API Endpoints</h2>
          <div className="mt-2 space-y-2">
            <p><strong>POST</strong> /users → Register</p>
            <p><strong>POST</strong> /users/login → Login</p>
            <p><strong>GET</strong> /users/me → Get current user</p>
            <p><strong>GET</strong> /blogs → Get blogs (auth required)</p>
            <p><strong>POST</strong> /blogs → Create blog</p>
            <p><strong>PUT</strong> /blogs/:id → Update blog</p>
            <p><strong>DELETE</strong> /blogs/:id → Delete blog</p>
          </div>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">💾 Security Measures</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Passwords are hashed using bcrypt</li>
            <li>JWT tokens ensure secure session management</li>
            <li>Authorization ensures users only access their own content</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold">👨‍💻 Developer Notes</h2>
          <p className="mt-2">
            This project is an evolving full-stack application designed as a personal learning project. Contributions, suggestions, and feedback are welcome.
          </p>
          <p>
            Check out my <a href="https://github.com/JoonHugh/Code/tree/master/WebDev/blog-project">GitHub</a> for more information! 
          </p>
        </section>
      </div>
    );

  } // ReadMe
  
  export default Readme;
  