
    // Chat component module
      (function(angular) {
          const app = angular.module('chat', []);
        let avatarImages = [
          "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
        ];


    // Chat room
    app.component('chatHeader', {
        template: `   
        <md-toolbar layout="row" class="md-sticky chat-header-toolbar">
            <div class="md-toolbar-tools">
                <md-button class="md-fab header-thumb" aria-label="thumb" >
                    <img ng-src=".{{$ctrl.chatService.user.thumbnail}}" class="md-avatar" alt="{{$ctrl.chatService.user.title}}" />
                </md-button>                    
                <h2 flex md-truncate>{{$ctrl.chatService.user.title}}</h2>                
            </div>
        </md-toolbar>             
        `,
      controller: ['chatService', function(chatService) {
        this.chatService = chatService;

      }]
    });
    // Chat room
    app.component('chatRoom', {
        template: `                 
        <md-toolbar layout="row" class="md-sticky">
            <div class="md-toolbar-tools">
                    <md-button class="md-fab header-thumb" aria-label="thumb" >
                        <img ng-src=".{{$ctrl.chatService.activeRoom.thumbnail}}" class="md-avatar" alt="{{$ctrl.chatService.activeRoom.title}}" />
                    </md-button>                    
                    <div>{{$ctrl.chatService.activeRoom.title}}</div>
            </div>
        </md-toolbar>
        <md-content class="chat-room-content">   
            <ul ng-if="$ctrl.chatService.activeRoom" class="conversations">
                <li ng-repeat="conversation in $ctrl.chatService.activeRoom.conversations" class="conv-line">
                    <div class="conv-wrap" ng-class="conversation.who">{{conversation.text}}</div>
                </li>
            </ul>         
            
        </md-content>
        <footer>
            FOOTER HERE
        </footer>            
        `,
        controller: ['chatService', '$stateParams', function(chatService, $stateParams) {
            this.roomId = $stateParams.id;
            this.chatService = chatService;
            chatService.getRoom(this.roomId);
        }]
    });

//  Chat room list
    app.component('chatRoomList', {
        template: `
        <md-content class="chat-room-list">
            <md-list flex>
                <md-list-item ng-repeat="room in $ctrl.rooms" ng-click="$ctrl.chatService.setActiveRoom($index)" class="md-3-line" ui-sref="chat.room({id: room.id})">
                    <img ng-src=".{{room.thumbnail}}" class="md-avatar" alt="{{room.title}}" />
                    <div class="md-list-item-text" layout="column">
                        <h3>{{ room.title }}</h3>
                        <p class="lst-item-text">
                            <span  ng-class="room.readStatus" class="status-icon">
                                <span ng-if="room.readStatus === 'sent'">&#x2714;</span>
                                <span ng-if="room.readStatus === 'receaved'">&#x2714;</span>
                                <span ng-if="room.readStatus === 'read'">&#x2714;</span>
                            </span>
                            {{ room.lastText }} 
                        </p>
                    </div>
                </md-list-item>
                <md-divider ></md-divider>
            </md-list>
        </md-content>
            
        `,
        controller: ['chatService', function(chatService) {
        this.chatService = chatService;
        this.rooms = chatService.availableRooms; //FIX: ...

        }]
    });

// Chat component
    app.component('chat', {
        template: `
                <div class="chat-container flex-row">
                    <div class="left-panel">
                        <chat-header></chat-header>
                        <!--<md-subheader class="md-no-sticky">3 line item (with hover)</md-subheader>-->
                        <chat-room-list></chat-room-list>
                    </div>
                    <div class="right-panel">
                        
                    <chat-room></chat-room>
                    <!--
                        <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
                            <md-button>{{title1}}</md-button>
                            <md-button md-no-ink class="md-primary">Primary (md-noink)</md-button>
                            <md-button ng-disabled="true" class="md-primary">Disabled</md-button>
                            <md-button class="md-warn">{{title4}}</md-button>
                            <div class="label">Flat</div>
                        </section>
                        -->
                    </div>
                </div>
        `,
        controller: ['chatService', '$stateParams', function(chatService, $stateParams) {
        console.log('chatService:\t', chatService);
        this.rooms = [
            {
            id: 0,
            title: "Room001",
            avatar: avatarImages[0]
            }
        ];
        }]
    });

    app.config([
    "$stateProvider",
    function($stateProvider) {
        $stateProvider
        .state("chat", {
            url: "/chat",
            component: "chat"
        })
        .state("chat.roomlist", {
            url: "chat/roomlist",
            component: "chatRoomList"
        })
        .state("chat.room", {
            url: "/room/:id",
            component: "chatRoom"
        })
    }]);
    return app;
})(angular);