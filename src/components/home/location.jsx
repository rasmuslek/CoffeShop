import settingsIcon from '../../assets/Icon.svg';

export default function Location() {
  return (
    <div className="Upper-container">
        <div className="Location">
            <h2 className="text-xs text-colorGray">
                Location
            </h2>

            <h2 className="text-sm">
                Kuressaare, Estonia
            </h2>
        </div>
        <button className="settings-button">
            <img className="settings-image" src={settingsIcon}/>
        </button>
    </div>
  )
}
