import "../Styles/VideoCard.css";
import youtube from "../../logos/youtube.svg";
import spotify from "../../logos/spotify.svg";
import deleteIcon from "../../logos/delete.svg";
import axios from "axios";

function VideoCard(props) {
  const getLogo = () => {
    const lowerCaseTitle = props.title.toLowerCase();
    if (lowerCaseTitle.includes("spotify")) {
      return spotify;
    } else if (lowerCaseTitle.includes("youtube")) {
      return youtube;
    }
    return null;
  };

  const renderLogo = () => {
    const logo = getLogo();
    if (logo) {
      return <img id="logo" src={logo} alt="logo" />;
    }
    return "noLogo";
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmation = window.confirm(
      `Are you sure to delete ${props.title}`
    );
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/${props.id}`);
        props.onDelete();
      } catch (e) {
        console.log("error occurred", e);
      }
    }
  };

  const incrementCounter = async (e) => {
    // e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/${props.id}`);
      console.log("Click updated");
    } catch (e) {
      console.log("error updating clicks of video");
    }
  };

  return (
    <a href={props.link} target="_blank" onClick={incrementCounter}>
      <div id="contain">
        {renderLogo()}
        <img
          id="delete"
          src={deleteIcon}
          onClick={handleDelete}
          alt="delete"
          title="delete"
        />
        <img id="thumbnail" src={props.image} alt="thumbnail" />
        <br />

        {props.title && <div id="videoTitle"> {props.title}</div>}
      </div>
    </a>
  );
}

export default VideoCard;
