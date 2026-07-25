"use client";

import Link from "next/link";
import {
  menuItems,
  pagesItems,
  portfolioItems,
  blogItems,
  contactItems,
} from "@/data/menu";

import Image from "next/image";
import { usePathname } from "next/navigation";

const MainMenu = () => {
  const pathname = usePathname();

  const isActive = (link) => {
    return pathname.replace(/\/\d+$/, "") === link.replace(/\/\d+$/, "");
  };

  return (
    <nav className="navbar navbar-expand-lg order-lg-2">
      <button
        className="navbar-toggler d-block d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span />
      </button>
      {/* End mobile collapse menu */}

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="d-block d-lg-none">
            <div className="logo">
              <Link href="/" className="d-block">
                <Image
                  src="/images/logo/logo_01.png"
                  alt="logo"
                  width={95}
                  height={30}
                />
              </Link>
            </div>
          </li>
          {/* End li */}

          <li className="nav-item dropdown ">
            <a
              // className="nav-link dropdown-toggle active-menu"
              href="/"
              role="button"
              //data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              className={
                menuItems.some((menu) =>
                  menu.items.some((elm) => isActive(elm.link))
                )
                  ? "nav-link active-menu"
                  : "nav-link"
              }

              // style={{color:'green'}}
            >
              Home
            </a>
            <ul style={{display:'none'}} className="dropdown-menu">
              <li>
                <div className="row">
                  {menuItems.map((menu, index) => (
                    <div className="col-lg-4" key={index}>
                      <div className="menu-column">
                        <h6
                          className={
                            menu.items.some((elm) => isActive(elm.link))
                              ? "mega-menu-title active-menu"
                              : "mega-menu-title"
                          }
                        >
                          {menu.title}
                        </h6>
                        {/* <ul className="style-none mega-dropdown-list">
                          {menu.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                href={item.link}
                                className={`dropdown-item ${
                                  isActive(item.link) ? "active" : ""
                                }`}
                              >
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul> */}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </li>
          {/* End li (home mega menu) */}

          <li className="nav-item  dropdown">
            <a
              // className="nav-link dropdown-toggle"
              className={
                // pagesItems.some((menu) =>
                //   menu.subItems.some((elm) => isActive(elm.link))
                // ) ||
                isActive("/pages-menu/pricing") ||
                isActive("/pages-menu/testimonials")
                  ? "nav-link active-menu"
                  : "nav-link"
              }
              href="/pages-menu/about-us-v3"
               role="button"
              // data-bs-toggle="dropdown"
              // data-bs-auto-close="outside"
              // aria-expanded="true"
            >
              About Us
            </a>
            {/* <ul className="dropdown-menu">
              {pagesItems.map((item, index) => (
                <li className="dropdown-submenu dropdown" key={index}>
                  <a
                    // className="dropdown-item dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    className={
                      item.subItems.some((elm) => isActive(elm.link))
                        ? "dropdown-item dropdown-toggle active-menu"
                        : "dropdown-item "
                    }
                    href="/pages-menu/about-us-v3"
                  >
                    <span>{item.title}</span>
                  </a>
                  <ul className="dropdown-menu">
                    {item.subItems.map((subMenu, i) => (
                      <li key={i}>
                        <Link
                          href={subMenu.link}
                          className={`dropdown-item ${
                            isActive(subMenu.link) ? "active" : ""
                          }`}
                        >
                          <span>{subMenu.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul> */}
          </li>
          {/* End li (pages) */}

          {/* IRDAI Guideline menu item removed */}

          {/* <li className="nav-item dropdown">
            <a
              // className="nav-link dropdown-toggle"
              className={
                blogItems.some((elm) => isActive(elm.link))
                  ? "nav-link dropdown-toggle active-menu"
                  : "nav-link dropdown-toggle"
              }
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Blog
            </a>
            <ul className="dropdown-menu">
              {blogItems.map((blog, index) => (
                <li key={index}>
                  <Link
                    href={blog.link}
                    className={`dropdown-item ${
                      isActive(blog.link) ? "active" : ""
                    }`}
                  >
                    <span>{blog.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End li (blog) */}

          <li className="nav-item">
            <a
              className={isActive("/pages-menu/pricing") ? "nav-link active-menu" : "nav-link"}
              href="/pages-menu/pricing"
            >
              Pricing
            </a>
          </li>
          {/* End li (pricing) */}

          <li className="nav-item dropdown">
            <a
              className={
                contactItems.some((elm) => isActive(elm.link))
                  ? "nav-link active-menu"
                  : "nav-link"
              }
              href="/contact/contact-v2"
              role="button"
              //data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Contact
            </a>
            {/* <ul className="dropdown-menu">
              {contactItems.map((contact, index) => (
                <li key={index}>
                  <Link
                    href={contact.link}
                    className={`dropdown-item ${
                      isActive(contact.link) ? "active" : ""
                    }`}
                  >
                    <span>{contact.text}</span>
                  </Link>
                </li>
              ))}
            </ul> */}
          </li>
          {/* End li (contact) */}
        </ul>
        {/* End ul */}

        {/* Mobile Content */}
        <div className="mobile-content d-block d-lg-none">
        <Link className="getPhone mt-70" href="">
  <svg 
    enableBackground="new 0 0 40 40" 
    height="40px" 
    id="Layer_1" 
    version="1.1" 
    viewBox="0 0 40 40" 
    width="40px" 
    xmlSpace="preserve" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <g>
        <g>
          <g>
            <path 
              d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18c-9.925,0-18-8.075-18-18S10.075,2,20,2 M20,0      C8.955,0,0,8.954,0,20c0,11.047,8.955,20,20,20c11.047,0,20-8.953,20-20C40,8.954,31.047,0,20,0L20,0z" 
              fill="#959595"
            />
          </g>
        </g>
      </g>
      <path 
        clipRule="evenodd" 
        d="M14.371,9.793c1.207-0.228,1.998,1.133,2.6,2.072   c0.586,0.912,1.307,1.982,1.016,3.169c-0.162,0.666-0.764,1.029-1.219,1.422c-0.449,0.388-1.133,0.744-1.299,1.34   c-0.271,0.967,0.322,1.982,0.689,2.56c0.834,1.306,1.842,2.483,3.129,3.534c0.623,0.51,1.488,1.191,2.355,1.016   c1.295-0.262,1.637-1.859,3.047-2.072c1.342-0.203,2.25,0.77,3.008,1.422c0.73,0.631,1.908,1.439,1.828,2.52   c-0.047,0.621-0.545,1.006-0.977,1.381c-0.439,0.383-0.824,0.813-1.258,1.096c-1.051,0.686-2.34,1.022-3.82,0.976   c-1.451-0.045-2.607-0.538-3.656-1.097c-2.051-1.094-3.672-2.633-5.199-4.348c-1.502-1.686-2.889-3.682-3.656-5.889   c-0.957-2.756-0.451-5.587,1.098-7.353c0.262-0.3,0.676-0.613,1.055-0.935C13.49,10.284,13.84,9.893,14.371,9.793z" 
        fill="#959595" 
        fillRule="evenodd"
      />
    </g>
  </svg> 
  +91 80468-10500  
</Link>
          
          <div className="d-flex flex-column align-items-center justify-content-center mt-20">
            <Link
              href="/contact/contact-v2"
              className="btn-twentyOne fw-500 tran3s"
            >
              Contact us
            </Link>
          </div>
        </div>
        {/* /.mobile-content */}
      </div>
    </nav>
  );
};

export default MainMenu;
