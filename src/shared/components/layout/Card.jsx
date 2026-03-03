import React from "react";
import { Card as BootstrapCard, Badge } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Loader from "../../../shared/components/layout/Loading";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no-img.jpg";

// Utility to safely get nested fields
const getNested = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
};

const MediaCard = ({
  item,
  loading = false,
  imageKey = "image",
  titleKey = "title",
  scoreKey = "score",
  statusKey = "status",
  episodeKey = "episodes",
  toDetail = true,
  detailPath = "anime",
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <BootstrapCard className="media-card h-100">
        <div className="media-card-image">
          <Loader text="" fullHeight={false} />
        </div>
        <BootstrapCard.Body>
          <div className="placeholder-glow">
            <span className="placeholder col-8"></span>
            <br />
            <span className="placeholder col-4 mt-2"></span>
          </div>
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  }

  const image = getNested(item, imageKey) || noImage;
  const title = getNested(item, titleKey) || "Unknown";
  const score = getNested(item, scoreKey);
  const status = getNested(item, statusKey);
  const episodeOrChapter = getNested(item, episodeKey);

  const handleClick = () => {
    if (toDetail && item?.mal_id) {
      navigate(`/${detailPath}/${item.mal_id}`);
    }
  };

  return (
    <BootstrapCard
      className="media-card h-100"
      onClick={handleClick}
      style={{ cursor: toDetail ? "pointer" : "default" }}
    >
      <div className="media-card-image position-relative">
        <img
          src={image}
          alt={title}
          className="img-fluid w-100 h-100 media-img"
          onError={(e) => { e.target.src = noImage; }}
        />
        {score && (
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
            Rating: {score}
          </Badge>
        )}
        <div className="media-overlay d-flex justify-content-center align-items-center">
          <FaEye />
        </div>
      </div>
      <BootstrapCard.Body>
        <BootstrapCard.Title className="text-truncate">{title}</BootstrapCard.Title>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {status && <Badge bg="secondary">{status}</Badge>}
          {episodeOrChapter && <Badge bg="info">{episodeOrChapter}</Badge>}
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default MediaCard;