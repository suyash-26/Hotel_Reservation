import useFetch from "../../hooks/useFetch";
import "./featured.css";
import React from "react";
const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=indore,bhopal,ujjain"
  );
  const images = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  ];
  const cities = ["Indore", "Bhopal", "Ujjain"];
  return (
    <div className="featured">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div key={i} className="featuredItem">
                <img src={img} alt="" className="featuredImg" />
                <div className="featuredTitles">
                  <h1>{cities[i]}</h1>
                  <h2>{data[i]} properties</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
export default Featured;
