import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const ClinicMap = (props) => {
    return (<>
        <Map
            google={window.google}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
            initialCenter={{
                lat: 40.854885,
                lng: -88.081807
            }}
            zoom={15}

        >
        </Map>
        {/* <Map
            google={window.google}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
            center={{
                lat: 40.854885,
                lng: -88.081807
            }}
            zoom={15}
        // onClick={this.onMapClicked}
        >
        </Map> */}
    </>);
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBQdC4DYNiHDMocsoxZ0SI58Nbj798ZBu0',

})(ClinicMap);