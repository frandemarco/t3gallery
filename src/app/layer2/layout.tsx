export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
    
        <div className=""> <div className="w-full">Second Layout</div> {children}</div>
    
    );
  }