import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { FaEye, FaStar } from "react-icons/fa";
import Loader from "../../../shared/components/layout/Loading";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no-img.jpg";
import "../../../styles/card.css";

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
  typeKey = "type",
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
            <span className="placeholder col-8 mb-2"></span>
            <span className="placeholder col-5"></span>
          </div>
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  }

  const image = getNested(item, imageKey) || noImage;
  const title = getNested(item, titleKey) || getNested(item, "title") || "Unknown";
  const score = getNested(item, scoreKey);
  const status = getNested(item, statusKey);
  const episodeOrChapter = getNested(item, episodeKey);
  const type = getNested(item, typeKey);

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
      <div className="media-card-image">

        <img
          src={image}
          alt={title}
          className="media-img"
          onError={(e) => { e.target.src = noImage; }}
        />

        {/* Type Badge — top left */}
        {type && <span className="media-type-badge">{type}</span>}

        {/* Score Badge — top right */}
        {score && (
          <span className="media-score-badge">
            <FaStar size={9} />
            {score}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="media-overlay d-flex justify-content-center align-items-center">
          <FaEye />
        </div>

      </div>

      <BootstrapCard.Body>
        <p className="media-card-title">{title}</p>
        <div className="media-card-meta">
          {status && <span className="media-badge-status">{status}</span>}
          {episodeOrChapter && (
            <span className="media-badge-episode">
              {detailPath === "manga" ? `${episodeOrChapter} ch` : `${episodeOrChapter} ep`}
            </span>
          )}
        </div>
      </BootstrapCard.Body>

    </BootstrapCard>
  );
};

export default MediaCard;