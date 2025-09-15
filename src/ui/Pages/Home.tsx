import transition from "../transition";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div className="info m-8 grid grid-cols-30 gap-5 justify-centered">
        <div className="innerInfo rounded-lg col-start-2 col-end-7 row-start-45 row-end-70 bg-[#FFFFFFFF] text-base wrap-break-word text-center mb-12"></div>
        <div className="innerInfo rounded-lg col-start-7 col-end-25 row-start-45 row-end-70 bg-[#FFFFFFFF] text-base wrap-break-word text-center mb-12"></div>
        <div className="innerInfo rounded-lg col-start-25 col-end-30 row-start-45 row-end-70 bg-[#FFFFFFFF] text-base wrap-break-word text-center mb-12"></div>
      </div>
    </div>
  );
};

export default transition(Home);
