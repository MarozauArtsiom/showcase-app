import "./Layout.scss";

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: "small" | "medium" | "large";
  border?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  padding = "medium",
  border = true,
}) => {
  return (
    <div
      className={`cc-layout m-padding-${padding} ${
        border ? "m-border" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
