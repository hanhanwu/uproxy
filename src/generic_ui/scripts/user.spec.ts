/// <reference path='user.ts' />
/// <reference path='../../third_party/typings/jasmine/jasmine.d.ts' />


describe('UI.User', () => {

  var user :UI.User;

  beforeEach(() => {
    spyOn(console, 'log');
  });

  function getInstance(id :string, description :string) :UI.Instance {
    return {
      instanceId: id,
      description: description,
      localSharingWithRemote: SharingState.NONE,
      localGettingFromRemote: GettingState.NONE,
      isOnline: true,
      bytesSent: 0,
      bytesReceived: 0
    };
  }

  it('creates with the correct userId', () => {
    user = new UI.User('fakeuser', null);
    expect(user.userId).toEqual('fakeuser');
  });

  it('updates with a profile', () => {
    user.update({
      network: 'testNetwork',
      user: {
        userId: 'fakeuser',
        name: 'fakename',
        imageData: 'fakeimage.uri',
        timestamp: Date.now()
      },
      offeringInstances: [],
      allInstanceIds: [],
      isOnline: true,
      consent: {
        localGrantsAccessToRemote: false,
        localRequestsAccessFromRemote: false,
        remoteRequestsAccessFromLocal: false,
        ignoringRemoteUserRequest: false,
        ignoringRemoteUserOffer: false
      }
    });
    expect(user.name).toEqual('fakename');
    expect(user.imageData).toEqual('fakeimage.uri');
  });

  it('does not change description if only 1 instance', () => {
    user.offeringInstances = [getInstance('instance1', '')];
    user.updateInstanceDescriptions();
    expect(user.offeringInstances[0].description).toEqual('');
  });

  it('updates empty descriptions when multiple instances', () => {
    user.offeringInstances = [
      getInstance('instance1', ''),
      getInstance('instance2', 'laptop'),
      getInstance('instance3', '')
    ];
    user.updateInstanceDescriptions();
    expect(user.offeringInstances[0].description).toEqual('Computer 1');
    expect(user.offeringInstances[1].description).toEqual('laptop');
    expect(user.offeringInstances[2].description).toEqual('Computer 3');
  });

  // TODO: more specs

});  // UI.User
