import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={600}
    height={480}
    viewBox="0 0 600 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="155" cy="-204" r="137" /> 
    <rect x="4" y="3" rx="0" ry="0" width="480" height="508" /> 
    <rect x="31" y="445" rx="0" ry="0" width="29" height="1" />
  </ContentLoader>
)

export default MyLoader