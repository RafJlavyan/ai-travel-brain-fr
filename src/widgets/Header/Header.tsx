import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Compass,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Award,
} from "lucide-react";
import styles from "./styles.module.scss";
import { useGetMe } from "src/shared/api/getMe";

const NAV_LINKS = [
  { label: "AI Planner", to: "/planner", icon: Sparkles },
  { label: "Explore Hotels", to: "/", icon: Compass },
  { label: "Recommendations", to: "/recommended-hotels", icon: Award },
  { label: "My Trips", to: "/trips" },
];

export default function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await useGetMe();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching 'me' profile:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  // 2. Performance-optimized class resolver function for Desktop links
  const getDesktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`;

  // 3. Performance-optimized class resolver function for Mobile links
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileLink} ${isActive ? styles.activeNavLink : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.innerWrap}>
          {/* BRAND LOGO */}
          <Link to="/" className={styles.brand}>
            <div className={styles.logoIconContainer}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <span className={styles.logoText}>
              Travel<span>Brain</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={getDesktopLinkClass}
              >
                {link.icon && <link.icon size={16} />}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP PROFILE ACTIONS */}
          <div className={styles.desktopActions}>
            {currentUser ? (
              <div className={styles.profileWrapper}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={styles.profileTrigger}
                >
                  <div className={styles.avatarCircle}>
                    {currentUser.firstName.charAt(0)}
                  </div>
                  <span className={styles.profileName}>
                    {currentUser.firstName}
                  </span>
                  <ChevronDown size={16} className={styles.textMuted} />
                </button>

                {isProfileOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      Signed in as <p>{currentUser.email}</p>
                    </div>
                    <button className={styles.dropdownItem}>
                      <User size={16} /> Profile Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className={`${styles.dropdownItem} ${styles.signOut}`}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={styles.getStartedBtn}
              >
                Get Started
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileToggle}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={getMobileLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon && <link.icon size={18} />}
              {link.label}
            </NavLink>
          ))}

          <div className={styles.mobileAuthSection}>
            {currentUser ? (
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileMeta}>
                  <p>
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p>{currentUser.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className={styles.mobileSignOutBtn}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className={styles.mobileGetStartedBtn}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
