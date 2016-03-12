var expect = chai.expect;
var assert = chai.assert;

var v =  new Validator();

describe("validators", function() {

    it("isEmail() 邮箱验证", function() {
        expect( v.isEmail('d.s.s.d@qq.com.cn') ).to.be.true; 
        expect( v.isEmail('d.s-s.d@qq.com.cn') ).to.be.true; 
        expect( v.isEmail('d.s.s.d@qq.cosdfaasdfasdfdsaf.cn.sh.sd.dsfsdfsfd') ).to.be.true; 
        expect( v.isEmail('ds.sd@qq.com') ).to.be.true; 
        expect( v.isEmail('dss1234.sd@qq.com') ).to.be.true; 
        expect( v.isEmail('ds.sd@qq.com.cn') ).to.be.true; 
        expect( v.isEmail('wowohoo@qq.com') ).to.be.true; 
        expect( v.isEmail('wowo.o@qq.com') ).to.be.true; 
        expect( v.isEmail('wowo@123.sd') ).to.be.true; 
        expect( v.isEmail('wowo@123.23') ).to.be.true; 
        expect( v.isEmail('wowo.oqqcom') ).to.be.false; 
        expect( v.isEmail('wowo@123') ).to.be.false; 
        expect( v.isEmail('wowo@asdf.中国') ).to.be.false; 
        expect( v.isEmail('wowo@中国.com') ).to.be.false; 
        expect( v.isEmail('中@qq.com') ).to.be.false; 

    });

    it("isIp() IP验证", function() {
        expect( v.isIp('01.01.01.0') ).to.be.true; 
        expect( v.isIp('192.168.1.1') ).to.be.true;
        expect( v.isIp('192.168.23.3') ).to.be.true; 
        expect( v.isIp('192.168.23.3.32.1') ).to.be.true; 
        expect( v.isIp('192.168.23.3.32') ).to.be.false; 
        expect( v.isIp('192.168.23.3.32.1.2') ).to.be.false;
        expect( v.isIp('192.168.23.3.32.1.wq2') ).to.be.false;
        expect( v.isIp('192.168.2.wq2') ).to.be.false;
        expect( v.isIp('192.168.1') ).to.be.false;
        expect( v.isIp('192.168') ).to.be.false;
        expect( v.isIp('192') ).to.be.false;
        expect( v.isIp('192.168.1.1233') ).to.be.false;
        expect( v.isIp('192.168.1324.123') ).to.be.false;
    });

    it("isPhone() 手机号码验证", function() {
        expect( v.isPhone('13611779473') ).to.be.true; 
        expect( v.isPhone('+8613611779473') ).to.be.true; 
        expect( v.isPhone('+23613611779473') ).to.be.true; 
    });

});