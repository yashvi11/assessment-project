# assessment-project
MusicApp/musique

Musique is a website that has the following functionalities:
a) Displays a list of user's playlist via its username.
b) Creates a dynamic playlist using multiple artist names.

Technologies used:
->Ajax (XHR)
->jquery
->Javascript
->fetch()
->spotify Oauth2 APIs
->CSS
->HTML

List of endpoints:
1. Add Tracks to a Playlist
endpoint: POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks

Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/

2.Get a List of User's Playlists
endpoint: GET https://api.spotify.com/v1/users/{user_id}/playlists


Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/

3.Get a Playlist's Tracks
endpoint:GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks

Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/

4.Search for an Item
endpoint:GET https://api.spotify.com/v1/search

Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/search/search/


5.Get an Artist's Albums
endpoint:GET https://api.spotify.com/v1/artists/{id}/albums

Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/

6.Get an Album's Tracks
endpoint:GET https://api.spotify.com/v1/albums/{id}/tracks

Source:https://developer.spotify.com/documentation/web-api

Link: https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/
