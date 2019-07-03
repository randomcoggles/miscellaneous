angular.module("chat").factory("chatService", function() {
  let user = {
    title: 'Itamar Serafim',
    thumbnail: '/assets/images/pp.png',
  }
  let activeRoom = null;
  let availableRooms = [
    {
      id: 0,
      title: "Polyglot Meetings",
      thumbnail: '/assets/images/pp(19).png',
      lastText: "Confira este Meetup com Clube Poliglota São Paulo ",
      lastTextWho: 'me',
    },
    {
      id: 1,
      title: "Taty Rocha",
      thumbnail: '/assets/images/pp(1).png',
      lastText: "Vem cá. To te convidando pra festinha da melancia :)",
      lastTextWho: "him"
    },
    {
      id: 2,
      title: "José Serafim",
      thumbnail: '/assets/images/pp(2).png',
      who: "José Serafim",
      lastText: "Vai na internet.  Vai economizar  uns 200 a 300 contos",
      lastTextWho: 'me',
      
    },
    {
      id: 3,
      title: "Rute Serafim",
      thumbnail: '/assets/images/pp(21).png',
      lastText: "Missed video call",
      lastTextWho: "sys",

    }
  ];

  let mockConversations = [
    {
       "date": "2019-02-03T17:10:00.000Z",
       "who": "me: Where is it?"
    },
    {
       "date": "2019-02-03T17:11:00.000Z",
       "who": "him Polyglot Meetings: I believe that it's near paulista Avenue"
    },
    {
       "date": "2019-02-03T17:11:00.000Z",
       "who": "him Polyglot Meetings: Two blocks from there"
    },
    {
       "date": "2019-02-03T17:11:00.000Z",
       "who": "him Polyglot Meetings: At Pamplona Street and between Santos and Jau streets"
    },
    {
       "date": "2019-02-03T17:12:00.000Z",
       "who": "me: Ok,"
    },
    {
       "date": "2019-02-03T17:12:00.000Z",
       "who": "me: But I think I'll leave it for another day😞"
    },
    {
       "date": "2019-02-03T17:13:00.000Z",
       "who": "me: Anyway thank you, sir and good luck"
    },
    {
       "date": null,
       "who": "him Polyglot Meetings: 👍🏽"
    },
    {
       "date": "2019-08-06T21:36:00.000Z",
       "who": "me: Hey, sir. Are you in the meeting?"
    },
    {
       "date": "2019-08-07T00:37:00.000Z",
       "who": "him Polyglot Meetings: Hi, Itamar. No, I didn't go to the meetings today."
    },
    {
       "date": "2019-08-07T00:37:00.000Z",
       "who": "me Polyglot Meetings: I am at home now."
    }
 ];

  let mockRoomsList = [
    {
      id: 0,
      title: "Polyglot Meetings",
      thumbnail: '/assets/images/pp(19).png',
      lastText: "Confira este Meetup com Clube Poliglota São Paulo ",
      lastTextWho: 'me',
      conversations: mockConversations
    },
    {
      id: 1,
      title: "Taty Rocha",
      thumbnail: '/assets/images/pp(1).png',
      lastText: "Vem cá. To te convidando pra festinha da melancia :)",
      lastTextWho: "him",
      conversations: mockConversations
    },
    {
      id: 2,
      title: "José Serafim",
      thumbnail: '/assets/images/pp(2).png',
      who: "José Serafim",
      lastText: "Vai na internet.  Vai economizar  uns 200 a 300 contos",
      lastTextWho: 'me',
      conversations: mockConversations
      
    },
    {
      id: 3,
      title: "Rute Serafim",
      thumbnail: '/assets/images/pp(21).png',
      lastText: "Missed video call",
      lastTextWho: "sys",
      conversations: mockConversations

    }
  ]; 

  function getRoom(id) {

    this.activeRoom = mockRoomsList.find(function(item){
      return +item.id === +id;
    });
    console.log('...');
  }

  function setActiveRoom(id) {
    // getRoom(id);
    this.activeRoom = this.availableRooms[id];
  }

  return {
    user,
    activeRoom,
    availableRooms,
    setActiveRoom,
    getRoom
  };
});
