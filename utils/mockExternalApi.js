import nock from 'nock';

const mockExternalApi = () => {
  nock(process.env.API_ENDPOINT)
    .get('?origin=LAX&destination=JFK')
    .reply(200, [
      {
        origin: 'LAX',
        destination: 'JFK',
        cost: 250,
        duration: 10,
        type: 'flight',
        id: '1379b65f-30ab-4fa8-9f86-44952660dd22',
        display_name: 'from LAX to JFK by flight',
      },
      {
        origin: 'LAX',
        destination: 'JFK',
        cost: 200,
        duration: 15,
        type: 'flight',
        id: '963cb400-1456-4bb0-aa44-8165b7b359e9',
        display_name: 'from LAX to JFK by flight',
      },
    ]);
};

export { mockExternalApi };
