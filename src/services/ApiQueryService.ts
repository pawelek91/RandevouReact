

export class ApiQueryService{
    static ApiEndpoint  = 'http://localhost:7777';
    
    GetIdentity(): string {
        let identity = localStorage.getItem('RANDEVOU_IDENTITY');
        if(identity === null || typeof(identity) === undefined) {
          identity = '';
         }
        return identity;
      }

      BuildAddress(address: string, id?: number): string {
        if (id == null && id === undefined) {
          return address;
        }
    
        address = address.replace('{id}', id.toString());
        return address;
      }

      GetApiKey() {
        const apiKey = localStorage.getItem('RANDEVOU_APIKEY');
        return apiKey;
      }

      static ClearLoginInfos() {
        localStorage.removeItem('RANDEVOU_IDENTITY');
        localStorage.removeItem('RANDEVOU_APIKEY');
      }
    

}