import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";
import BlogItem from "../src/BlogItem.jsx";
import BlogForm from "../src/BlogForm.jsx";
import Spinner from "../src/Spinner.jsx";
import { getBlogs, reset } from "../src/features/blogs/blogSlice.js";
import { createBlog } from "../src/features/blogs/blogSlice.js";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TbFilter } from "react-icons/tb";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { LuUtensilsCrossed } from "react-icons/lu";
import { TbApple } from "react-icons/tb";
import { IoIosFitness } from "react-icons/io";
import { TbHanger } from "react-icons/tb";
import { LuLaptopMinimal } from "react-icons/lu";
import { TiCameraOutline } from "react-icons/ti";
import { LuGraduationCap } from "react-icons/lu";
import { LuMusic } from "react-icons/lu";
import { MdOutlineChair } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import FilterDropdown from '../src/FilterDropdown.jsx';



function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeFilters, setActiveFilters] = useState([])
  const navRefs = useRef([]);

  const TABS = {
    ALL: 0,
    NEW_POST: 1,
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getBlogs());
    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, message, dispatch]);


  const searchContent  = (content, searchTerm) => {
    return content.substring(0, 5000).toLowerCase().includes(searchTerm)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        if (searchTerm.trim() == '') {
            setFilteredBlogs(blogs);
        } else {
            const  searchTermLower = searchTerm.toLowerCase()
            setFilteredBlogs(
                blogs.filter(blog => 
                    blog.title.toLowerCase().includes(searchTermLower) || 
                    searchContent(blog.content, searchTermLower)
                ));
        }
    }, 200)

    return () => clearTimeout(timer)
  }, [searchTerm, blogs])


  if (isLoading) {
    return <Spinner />;
  }

  // Calculate span position/size
  const activeLi = navRefs.current[activeIndex];
  const spanStyle = activeLi
    ? {
        left: activeLi.offsetLeft,
        width: activeLi.offsetWidth,
      }
    : {};


    const categories = [
        { label: "General", value: "GENERAL" , icon: <TbFilter />},
        { label: "Travel", value: "TRAVEL", icon: <PiAirplaneTiltLight />},
        { label: "Food", value: "FOOD", icon: <LuUtensilsCrossed />},
        { label: "Lifestyle", value: "LIFESTYLE", icon: <TbApple />},
        { label: "Fitness", value: "FITNESS", icon: <IoIosFitness />},
        { label: "Fashion", value: "FASHION", icon: <TbHanger />},
        { label: "Technology", value: "TECHNOLOGY", icon: <LuLaptopMinimal />},
        { label: "Photography", value: "PHOTOGRAPHY", icon: <TiCameraOutline />},
        { label: "Education", value: "EDUCATION", icon: <LuGraduationCap />},
        { label: "Music", value: "MUSIC", icon: <LuMusic />},
        { label: "Interior", value: "INTERIOR", icon: <MdOutlineChair />},
        { label: "Other", value: "OTHER", icon: <RxDashboard />},
    ];

    const finalFilteredBlogs = (searchTerm ? filteredBlogs : blogs).filter(blog => {
        if (activeFilters.length === 0) return true;
        return activeFilters.includes(blog.category);
    })


  return (
    <div className={styles["container"]}>
      <h2 className={styles["page-name"]}>My Blog Posts</h2>
      <div className={styles["nav-container"]}>
        <nav className={styles["page-nav"]}>
          {["All posts", "New post"].map((label, i) => (
            <li
              key={i}
              onClick={() => setActiveIndex(i)}
              ref={(el) => (navRefs.current[i] = el)}
              style={{
                color: i === activeIndex ? "rgb(255, 182, 87)" : "black",
              }}
            >
              {label}
            </li>
          ))}
          <span style={spanStyle}></span>
        </nav>
      </div>

      <div>
        <section className={styles["content"]}>
          {activeIndex === TABS.ALL &&
             (blogs.length > 0 ? (
                <>
                  <div>
                    <div className={styles["outer-grid"]}>
                        <h3 className={styles["tab-name"]}>All posts</h3>
                        <div className={styles["filter-container"]}>
                            <FilterDropdown 
                                filters={categories}
                                onFilterChange={setActiveFilters}
                            />
                        </div>
                    </div>
                    
                    <div className={styles["search-bar"]}>
                      <i>
                        <FiSearch />
                      </i>
                      <input
                        type="text"
                        placeholder="I am looking for..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles["input"]}
                      />
                      {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className={styles['clear-button']}
                        >
                            <IoClose className={styles['icon']}/>
                        </button>
                      )}
                    </div>
                  </div>
  
  
                  <div className={styles["blog"]}>
                    {(searchTerm ? filteredBlogs : blogs).length > 0 &&
                    finalFilteredBlogs.map((blog) => (
                      <BlogItem key={`${blog._id}-${blog.slug}`} blog={blog} />
                    ))}
                  </div>
                </>
              ) : (
                <h3>No blogs posted</h3>
              ))}
          {activeIndex === TABS.NEW_POST && (
            <BlogForm
              onSubmitHandler={(blogData) => dispatch(createBlog(blogData))}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
