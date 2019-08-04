/**
 * FOOTER
 * Displays ratings esrb rating logos
 *
 * ESRB - Appears in US, CA, Mexico, Latin America, South America
 * PEGI - Europe
 * USK18 - UK
 *
 */
(function($){

  var NorthAmerica = ['AI','AG','AW','BS','BB','BZ','BM','BQ','VG','CA','KY','CR','CU','CW','DM','DO','SV','GL','GD','GP','GT','HT','HN','JM','MQ','MX','PM','MS','CW','KN','NI','PA','PR','BQ','BQ','SX','KN','LC','PM','VC','TT','TC','US','VI'];
  var SouthAmerica = ['AR','BO','BR','CL','CO','EC','FK','GF','GY','GY','PY','PE','SR','UY','VE'];
  var Europe       = ['AL','AD','AT','BY','BE','BA','BG','HR','CY','CZ','DK','EE','FO','FI','FR','DE','GI','GR','HU','IS','IE','IT','LV','LI','LT','LU','MK','MT','MD','MC','NL','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','UA','GB','VA','RS','IM','RS','ME'];
  var Asia         = ['AF','AM','AZ','BH','BD','BT','BN','KH','CN','CX','CC','IO','GE','HK','IN','ID','IR','IQ','IL','JP','JO','KZ','KW','KG','LA','LB','MO','MY','MV','MN','MM','NP','KP','OM','PK','PS','PH','QA','SA','SG','KR','LK','SY','TW','TJ','TH','TR','TM','AE','UZ','VN','YE'];
  var Africa       = ['DZ','AO','SH','BJ','BW','BF','BI','CM','CV','CF','TD','KM','CG','CD','DJ','EG','GQ','ER','ET','GA','GM','GH','GN','GW','CI','KE','LS','LR','LY','MG','MW','ML','MR','MU','YT','MA','MZ','NA','NE','NG','ST','RE','RW','ST','SN','SC','SL','SO','ZA','SS','SH','SD','SZ','TZ','TG','TN','UG','CD','ZM','TZ','ZW'];
  var Antartica    = ['AQ'];
  var Austrailia   = ['AS','AU','NZ','CK','TL','FM','FJ','PF','GU','KI','MP','MH','UM','NR','NC','NZ','NU','NF','PW','PG','MP','WS','SB','TK','TO','TV','VU','UM','WF'];

  var esrbRegions = NorthAmerica.concat(SouthAmerica);
  var pegiRegions = Europe;
  var uksRegions = ['DE'];

  function init() {
    Event.ready('gotRegion',function(data){
      console.log('FOOTER GOT REGION', data)
      if (!data.region) return false;

      //data.region = 'US';
      //data.region = 'CA';
      //data.region = 'DE';
      //data.region = 'GB';
      //data.region = 'FR';

      // Show ESRB logo for North America & South America
      if (esrbRegions.indexOf(data.region) > -1) {
        $('.logo-esrb').css('display','inline-block');
      }

      // Show PEGI Logo for Europe
      if (pegiRegions.indexOf(data.region) > -1 && data.region != "DE") {
        $('.logo-pegl16').css('display','inline-block');
        //$('.logo-pegl16, .logo-badlanguage, .logo-violence').css('display','inline-block');
      }

      // Show USK18 for German
      if (uksRegions.indexOf(data.region) > -1) {
        $('.logo-usk18').css('display','inline-block');
      }

    });
  }

  $(document).ready(init);

}(jQuery));
