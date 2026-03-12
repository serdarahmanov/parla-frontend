import React from "react";

const MainSection3 = () => {
  return (
    <div className="h-screen  grid grid-cols-15 grid-rows-6 p-10">
      <div className="col-span-3 col-start-2 row-start-2 row-span-2">
        <div className="text-5xl">Branding</div>
        <div className="max-w-150 mt-3 ">
          Branding is a key part of any business, big or small. We help
          companies build clear and recognizable identities that people
          understand and remember.
        </div>
      </div>
      <div id="section3-1" className="h-full w-full col-span-3 col-start-2 row-start-4 row-span-3 bg-amber-300 ">
        <img  className=" w-full h-full object-cover" src="/Section-3/Section-3-1.png" alt="photi-1" />
      </div>
      <div id="section3-2" className="h-full w-full col-span-3 col-start-7 row-start-2 row-span-3 bg-amber-300">
        <img  className=" w-full h-full object-cover" src="/Section-3/Section-3-2.png" alt="photi-2" />
      </div>
      <div id="section3-3" className="h-full w-full col-span-3 col-start-12 row-start-1 row-span-3 bg-amber-300">
        <img className=" w-full h-full object-cover" src="/Section-3/Section-3-3.png" alt="photi-3" />
      </div>
    </div>
  );
};

export default MainSection3;
