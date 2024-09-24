interface SectionProps {
  sectionTitle: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ sectionTitle, children }) => {
  return (
    <div className="flex flex-col justify-start pt-24 h-screen">
      <h1 className="text-3xl mt-12 mb-20">{sectionTitle}</h1>
      {children}
    </div>
  );
};
