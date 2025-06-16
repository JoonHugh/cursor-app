import styles from './About.module.css';

function About() {
    return (
      <div className={styles["container"]}>
        <h1>About Cursor</h1>
        <p >
          <span>Cursor</span> is a fully functional blogging platform designed and developed to enable users to share their thoughts, experiences, and stories in a clean and engaging interface.
          Users can register, log in, and create, edit, and manage their blog posts.
        </p>
        <p >
          Cursor was built using the MERN stack: <span>MongoDB</span> for data persistence, <span>Express.js</span> and <span>Node.js</span> for the backend API, and <span>React</span> for the frontend interface.
        </p>
        <p >
          As a learning project, Cursor incorporates essential concepts of full-stack development, user authentication, authorization, secure password storage, and persistent data handling.
          The frontend is styled with responsive design in mind and includes UI animations for a better user experience.
        </p>
        <p>This project was created by a Computer Science student at the University of Georgia as part of a journey into full-stack development.</p>
      </div>
    );
  }
  
  export default About;
  