import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {

  return (
    <div className="w-full overflow-x-hidden  bg-primary antialiased">
      <div className="mx-auto max-w-[1920px]">
        <Navbar />
       

        <main>{props.children}</main>

    <Footer/>
      </div>
    </div>
  );
};
