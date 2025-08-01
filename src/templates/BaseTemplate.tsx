import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const BaseTemplate = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full overflow-x-hidden  bg-primary antialiased">
      <div className="mx-auto max-w-[1920px]">
        <Navbar />

        <main>{props.children}</main>

        <Footer />
      </div>
    </div>
  );
};
