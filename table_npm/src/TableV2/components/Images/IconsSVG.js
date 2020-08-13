import React from 'react';


export const ArrowDown = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-short" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" />
  <path fillRule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z" />
</svg>;

export const ArrowUp = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-short" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
  <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 5.707 5.354 8.354a.5.5 0 1 1-.708-.708l3-3z" />
</svg>

export const Gear = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear-fill" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z" />
</svg>

export const Discard = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square-fill" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.854 4.854a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z" />
</svg>

export const Check = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
  <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
</svg>

export const Insert = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
  <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
</svg>

export const TrashCan = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg>

export const GeoLocate = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
</svg>

export const Download = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z" />
  <path fillRule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z" />
  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z" />
</svg>

export const Square = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
</svg>

export const CheckedSquare = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2-square" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  <path fillRule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z" />
</svg>

export const PencilSquare = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
</svg>

export const Report = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-text" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z" />
  <path fillRule="evenodd" d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
</svg>

export const ImagedRecords = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-richtext-fill" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M12 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542l1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
</svg>

export const ArrowLeftSquare = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-square-fill" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.354 10.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z" />
</svg>

export const ArrowRightSquare = ({ color }) => <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-square-fill" fill={color} xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
</svg>

export const Disk = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill={color}
  version="1.1" fillRule="evenodd" viewBox="0 0 105.57 105.57">
  <metadata id="CorelCorpID_0Corel-Layer" />
  <path className="fil0" d="M-0 91.5l0 -84.52c0,-1.95 0.68,-3.6 2.07,-4.94 1.39,-1.36 3.04,-2.04 4.99,-2.04l91.53 0c1.95,0 3.6,0.68 4.94,2.04 1.36,1.34 2.04,2.99 2.04,4.94l0 91.53c0,1.95 -0.68,3.6 -2.02,4.99 -1.36,1.39 -3.02,2.07 -4.96,2.07l-84.49 0 -14.09 -14.07zm49.35 -21.12l-17.67 0 0 31.69 17.67 0 0 -31.69zm28.18 31.69l21.05 0c1.19,0 2.07,-0.29 2.63,-0.9 0.56,-0.58 0.85,-1.46 0.85,-2.6l0 -91.55c0,-2.34 -1.17,-3.5 -3.48,-3.5l-10.54 0 0 42.15c0,1.95 -0.68,3.63 -2.07,4.99 -1.39,1.39 -3.04,2.07 -4.99,2.07l-56.34 0c-1.95,0 -3.6,-0.68 -4.96,-2.07 -1.34,-1.36 -2.02,-3.04 -2.02,-4.99l0 -42.15 -10.59 0c-2.38,0 -3.58,1.17 -3.58,3.5l0 83.06 12.02 12 12.65 0 0 -31.64c0,-2.36 1.17,-3.55 3.5,-3.55l42.27 0c2.38,0 3.58,1.19 3.58,3.55l0 31.64zm7.01 -98.56l-63.37 0 0 42.2c0,1.14 0.29,2.02 0.9,2.6 0.58,0.61 1.46,0.9 2.6,0.9l56.36 0c2.34,0 3.5,-1.19 3.5,-3.55l0 -42.15z" />
</svg>