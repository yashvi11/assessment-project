

 let user_id = "7mgdyg4ikbk3cf20i6atmrxv0";


let playlist_url="https://api.spotify.com/v1/users/"+user_id+"/playlists";
let token = "Bearer BQCEFDV6S1mKmKBAMlIcxBMrMfI6vpzmv4_ng2dUrY4YPSU9dLayBcTd5sMeq6PrsNrG1vX7N_0-aaUiUaZwrwirb4QDawd7hr1JlTB59c6XB5XTakWyNr99LvNOfK1kNfAU0mTWgQURT4vquae3hbdijEp6tElt3a_rwh-GHKCi9NRB_i4jiI8Obw1G1sJXxfzMma65b3RdSpRkCkxHh_r-_ntn40dMmNOHbX7YIQ";
document.addEventListener('DOMContentLoaded',function(ev){
    let uri = playlist_url;
    let h =new Headers();
    h.append('Accept','application/json');
    h.append('Authorization','token' + token);
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
        credentials: 'same-origin'
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
        let playlists=jsonData;
            
        console.log(JSON.stringify(playlists.items, null, " "));
        var i;
        
              for(i=0;i<playlists.items.length;i++)
              {
                  var playlist_url2 =playlists.items[i].href;
               let uri2 = playlist_url2;
              let req2 = new Request(uri2, {
                  method: 'GET',
                  headers: h,
                  credentials: 'same-origin'
              });
               fetch(req2)
               .then( (response)=>{
                  if (response.ok)
                  {
                      /* var playlist = JSON.parse(response.body);
                   
                          console.log("playlist: " + playlist.name);
                          playlist.tracks.items.forEach(function(track)
                          {
                              console.log(track.track.name);
                          }); */
                          return response.json();
                      }
                      else{
                          throw new Error('BAD HTTP 2!');
                      }
                      })
                      .then((res)=>{
                       
                            let playlist = res;
                         
                                console.log(JSON.stringify(playlist.name, null, " "));
                                          const baseUrl = 'https://open.spotify.com/embed/playlist/'+playlist.id;

$('.playlist2').append(`<div><iframe src="${baseUrl}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
`);
                                playlist.tracks.items.forEach(function(track)
                                {
                                    console.log(track.track.name);
                                });
                            
                      })
                      
                   .catch( (err)=>{
                          console.log('ERROR',err.message
                          );
                      })
              }

    })
    .catch( (err)=>{
        console.log('ERRor',err.message
        );
    })

})
