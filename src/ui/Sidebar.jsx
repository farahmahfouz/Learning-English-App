import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useLevels } from "../features/levels/useLevels";

const Aside = styled.aside`
  width: 260px;
  flex-shrink: 0;
  min-height: 100vh;
  background: #050505;
  border-right: 1px solid #1e1e1e;
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 0;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 0;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #1e1e1e;
    padding: 1.6rem 1.2rem;
  }
`;

const Brand = styled.div`
  padding: 0 0.8rem;
`;

const BrandTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #e5e5e5;
  letter-spacing: -0.02em;
`;

const BrandSub = styled.p`
  font-size: 1.15rem;
  color: #555;
  margin-top: 0.4rem;
  line-height: 1.4;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-height: 0;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  font-size: 1.35rem;
  color: #888;
  border: 1px solid transparent;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    color: #c4c4c4;
    background: rgba(139, 92, 246, 0.06);
  }

  &.active {
    color: #e0e0e0;
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.25);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 1.25rem;
  }
`;

const Step = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4rem;
  height: 2.4rem;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 600;
  background: #111;
  color: #666;
  border: 1px solid #222;

  ${Item}.active & {
    background: rgba(139, 92, 246, 0.2);
    color: #c4b5fd;
    border-color: rgba(139, 92, 246, 0.35);
  }
`;

const Label = styled.span`
  flex: 1;
`;

const SubNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.4rem;
  padding-left: 1.2rem;
  border-left: 1px solid #1e1e1e;
  margin-left: 1.8rem;
  overflow: hidden;
  max-height: ${(p) => (p.$open ? "500px" : "0")};
  opacity: ${(p) => (p.$open ? 1 : 0)};
  transition: max-height 0.3s ease, opacity 0.2s ease;
`;

const SubItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  font-size: 1.25rem;
  color: #555;
  border: 1px solid transparent;
  transition: background 0.15s, color 0.15s;

  &:hover {
    color: #c4c4c4;
    background: rgba(139, 92, 246, 0.06);
  }

  &.active {
    color: #e0e0e0;
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.2);
  }
`;

const SubDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(p) =>
    p.$completed ? "#a78bfa" : p.$current ? "#06b6d4" : "#2e2e2e"};
`;

const SubLabel = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubBadge = styled.span`
  font-size: 1rem;
  color: ${(p) => (p.$completed ? "#a78bfa" : "#444")};
`;

const ChevronIcon = styled.svg`
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
  transform: ${(p) => (p.$open ? "rotate(180deg)" : "rotate(0deg)")};
  color: #444;
  flex-shrink: 0;
`;

const UserSection = styled.div`
  position: relative;
  margin-top: auto;
  padding-top: 1.6rem;
  border-top: 1px solid #1e1e1e;
`;

const Menu = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 0.6rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  z-index: 20;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: ${(p) => (p.$danger ? "#f87171" : "#ccc")};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #1e1e1e;
  margin: 0.4rem 0;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border: 1px solid #1e1e1e;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: #c4b5fd;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.p`
  font-size: 1.35rem;
  font-weight: 500;
  color: #e5e5e5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.p`
  font-size: 1.15rem;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DotsBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0.4rem;
  color: #666;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    color: #aaa;
    background: rgba(255, 255, 255, 0.05);
  }
  &:focus {
    outline: none;
  }
`;

export default function Sidebar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { levels } = useLevels();
  const [menuOpen, setMenuOpen] = useState(false);

  const levelsActive =
    pathname === "/levels" || pathname.startsWith("/levels/");

  const [levelsCollapsed, setLevelsCollapsed] = useState(false);
  const levelsOpen = levelsActive && !levelsCollapsed;

  useEffect(() => {
    if (!levelsActive) return;
    queueMicrotask(() => setLevelsCollapsed(false));
  }, [levelsActive]);

  const menuRef = useRef(null);

  const showPlacement = user && !user.hasCompletedPlacementTest;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let step = 1;
  const placementStep = showPlacement ? step++ : null;
  const levelsStep = step++;
  const shadowStep = step++;
  const certStep = step;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <Aside>
      <Brand>
        <BrandTitle>Course</BrandTitle>
        <BrandSub>
          Jump to any step — no need to go back page by page.
        </BrandSub>
      </Brand>

      <Nav>
        {showPlacement && (
          <Item to="/placement-test" end>
            <Step>{placementStep}</Step>
            <Label>Placement test</Label>
          </Item>
        )}

        <div>
          <Item
            to="/levels"
            className={levelsActive ? "active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigate("/levels");
              if (levelsActive) setLevelsCollapsed((c) => !c);
              else setLevelsCollapsed(false);
            }}
          >
            <Step>{levelsStep}</Step>
            <Label>Levels</Label>
            <ChevronIcon
              $open={levelsOpen}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </ChevronIcon>
          </Item>

          <SubNav $open={levelsOpen}>
            {(levels ?? []).map((level) => {
              const isCompleted = user?.completedLevels?.includes(level._id);
              const isCurrent = level.levelNumber === user?.currentLevel;

              return (
                <SubItem key={level._id} to={`/levels/${level._id}`}>
                  <SubDot $completed={isCompleted} $current={isCurrent} />
                  <SubLabel>{level.title}</SubLabel>
                  <SubBadge $completed={isCompleted}>
                    {isCompleted ? "✓" : isCurrent ? "→" : ""}
                  </SubBadge>
                </SubItem>
              );
            })}
          </SubNav>
        </div>

        <Item to="/shadowing" end>
          <Step>{shadowStep}</Step>
          <Label>Shadowing</Label>
        </Item>

        <Item to="/certificate" end>
          <Step>{certStep}</Step>
          <Label>Certificate</Label>
        </Item>
      </Nav>

      <UserSection ref={menuRef}>
        {menuOpen && (
          <Menu>
            <MenuItem
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem $danger onClick={() => setMenuOpen(false)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </MenuItem>
          </Menu>
        )}

        <UserCard onClick={() => setMenuOpen((v) => !v)}>
          <Avatar>{initials}</Avatar>
          <UserInfo>
            <UserName>{user?.name ?? "Student"}</UserName>
            <UserEmail>{user?.email ?? ""}</UserEmail>
          </UserInfo>
          <DotsBtn
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </DotsBtn>
        </UserCard>
      </UserSection>
    </Aside>
  );
}
