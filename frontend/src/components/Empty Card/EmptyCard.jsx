import React from "react";

export const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-60" />
      <p className="w-1/2 text-md font-medium text-slate-700 text-center leading-7">
        {message}
      </p>
    </div>
  );
};
