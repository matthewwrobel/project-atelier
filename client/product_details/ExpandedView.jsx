import React from 'react';

const ExpandedView = (props) => {

  if (props.selectedStyle) {
    var photoGallery = props.selectedStyle.photos;
    return (
      <div id="expandedView">
        <a target="_blank">
          <img 
            src={photoGallery[props.currPhotoIndex].url} 
            alt={props.selectedStyle.name} 
            className="defaultView" 
            id={props.selectedStyle.style_id}>
          </img>
          <a onClick={props.toggleView} id="fullscreenIcon"><i class="fas fa-expand"></i></a>
          {props.currPhotoIndex !== 0 ? 
            <a
              onClick={props.handleLeftClick} 
              id="leftArrow">&larr;
            </a> : null}
          {props.currPhotoIndex !== (props.styleInfo.length - 1) ?
            <a 
              onClick={props.handleRightClick}
              id="rightArrow">&rarr;
            </a> : null}
        </a>
      </div>
    );
  } 
  return null;
};

export default ExpandedView;