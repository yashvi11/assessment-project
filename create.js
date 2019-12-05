
const app = {};
let base_id;
let uri_arr;
let snap_id;
const token = "Bearer BQCY8t967SFn11AVlRe9c6MVRCILpFHmLX7iD8wgDmhEIYsMSWKqGRgHgvM8-AdVODNifQMJP25KmfbxJGSPGzwoMJfo5WfzGDi9JR5qBHYqGdGyif7c7VAHzrigRy7JdlIx3GY1sKeQuZYrS8sbS9QDttE2aHvjQr6wRtlywtKMnVmGU7UGdVfoS6ZQbrd1pzcGGZU9OxaWbUPvGZc_T0JdIAVIHnRHaUG30ycZyQ";
app.getArists = (artist) => $.ajax({
	url: 'https://api.spotify.com/v1/search',
	method: 'GET',
             headers: {"Authorization":  token,
},
	dataType: 'json',
	data: {
		type: 'artist',
		q: artist
	}
});

app.getAristsAlbums = (id) => $.ajax({
	url: `https://api.spotify.com/v1/artists/${id}/albums`,
	method: 'GET',
             headers: {"Authorization":  token,
},
    dataType: 'json',
	data: {
		album_type: 'album',
	}
});

app.getAlbumTracks = (id) => $.ajax({
	url: `https://api.spotify.com/v1/albums/${id}/tracks`,
               headers: {"Authorization":  token,
},
	method: 'GET',
	dataType: 'json'
});

app.getAlbums = function(artists) {
	let albums = artists.map(artist => app.getAristsAlbums(artist.id));
	$.when(...albums)
		.then((...albums) => {
			let albumIds = albums
				.map(a => a[0].items)
				.reduce((prev,curr) => [...prev,...curr] ,[])
				.map(album => app.getAlbumTracks(album.id));

			app.getTracks(albumIds);
		});
};

app.getTracks = function(tracks) {
	$.when(...tracks)
		.then((...tracks) => {
			tracks = tracks
				.map(getDataObject)
				.reduce((prev,curr) => [...prev,...curr],[]);	
			const randomPlayList = getRandomTracks(50,tracks);
			app.createPlaylist(randomPlayList);
		})
};

app.createPlaylist = function(songs) {
           

	songs = songs.map(song => song.id).join(',');
         uri_arr=songs.split(',');
         var i;
         for(i=0;i<uri_arr.length;i++)
         {
             uri_arr[i]="spotify:track:"+uri_arr[i];
         }
        console.log(JSON.stringify(uri_arr,null," "));
        //console.log(songs[1]);
	$('.loader').removeClass('show');
       
       $(function () {
  // do stuff
  callPlaylist(uri_arr);
});
        
	
        
}

function callPlaylist(uri_arr)
{ let user_id = "7mgdyg4ikbk3cf20i6atmrxv0";


//let token = "Bearer BQClXXUGTjoYN5PoNCsuMn8vTVpL1c_E10pL8ch_bZUPGKwjlob4e3SlN7RtNGZRXbs0JHLZB3lVUDsvQZtH5JK2yXPmuQTyKnkX53_Y83F3xn42bmpEuG4vYY1ly76bnVIKj1LJjCjzexyj3rC7Mn9mnYG950dm1nDR90QBpNxWAEhhmmXjbpnPu0x5q4en4utcM6bFWXInc4-FtXOlMOfC";
     let h =new Headers();
    h.append('Accept','application/json');
    h.append('Authorization','token' + token);
    let req = new Request( 'https://api.spotify.com/v1/playlists/'+base_id+'/tracks', {
        method: 'POST',
        headers: h,
        
       body: JSON.stringify({"uris": uri_arr}),
            json: true,
        
        
    });

    fetch(req)
    .then( (response)=>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('BAD HTTP2 !');
        }
    })
    .then( (jsonData)=>{
        
            snap_id=jsonData.snapshot_id;
        console.log(snap_id);
                const baseUrl = 'https://open.spotify.com/embed/playlist/'+base_id;

$('.playlist').append(`<iframe src="${baseUrl}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
`);

    })
    .catch( (err)=>{
        console.log('ERRor2',err.message
        );
    })

} 



app.init = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		let artists = $('input[type=search]').val();
		$('.loader').addClass('show');
		artists = artists
			.split(',')
			.map(app.getArists);
		
		$.when(...artists)
			.then((...artists) => {
				artists = artists.map(a => a[0].artists.items[0]);
				console.log(artists);
				app.getAlbums(artists);
			});
	});

}

const getDataObject = arr => arr[0].items;

function getRandomTracks(num, tracks) {
	const randomResults = [];
	for(let i = 0; i < num; i++) {
		randomResults.push(tracks[ Math.floor(Math.random() * tracks.length) ])
	}
	return randomResults;
}

$(app.init);





//let artists;
//	$('form').on('submit', function(e) {
//		e.preventDefault();
//		 artists = $('input[type=search]').val();
//		$('.loader').addClass('show');
////		artists = artists
////			.split(',')
////			.map(app.getArists);
////		console.log(search);
////		$.when(...artists)
////			.then((...artists) => {
////				artists = artists.map(a => a[0].artists.items[0]);
////				console.log(artists);
//				//app.getAlbums(artists);
////			});
//console.log(artists);
//});
    
 let user_id = "7mgdyg4ikbk3cf20i6atmrxv0";
 

let playlist_url="https://api.spotify.com/v1/users/"+user_id+"/playlists";
//let token = "Bearer BQClXXUGTjoYN5PoNCsuMn8vTVpL1c_E10pL8ch_bZUPGKwjlob4e3SlN7RtNGZRXbs0JHLZB3lVUDsvQZtH5JK2yXPmuQTyKnkX53_Y83F3xn42bmpEuG4vYY1ly76bnVIKj1LJjCjzexyj3rC7Mn9mnYG950dm1nDR90QBpNxWAEhhmmXjbpnPu0x5q4en4utcM6bFWXInc4-FtXOlMOfC";
document.addEventListener('DOMContentLoaded',function(ev){
    let uri = playlist_url;
    let h =new Headers();
    h.append('Accept','application/json');
    h.append('Authorization','token' + token);
    
    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        
       body: JSON.stringify({name: "test", public: false}),
            json: true,
        
        
    });
    
    fetch(req)
    .then( (response)=>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('BAD HTTP !');
        }
    })
    .then( (jsonData)=>{
        
            base_id=jsonData.id;
        console.log(base_id);


    })
    .catch( (err)=>{
        console.log('ERRor',err.message
        );
    })

}) 
//	$('.playlist').append(`<iframe src="${baseUrl+songs}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
