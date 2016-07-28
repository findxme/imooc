<?php

echo '<div class="rl-modal-header">
                <h1>
                    <span class="active-title" id="signin" data-sign="signin">登录</span>
                    <span data-sign="signup" class="xa-showSignup" id="signup">注册</span>
                </h1>
                <button type="button" class="rl-close" data-dismiss="modal" hidefocus="true" aria-hidden="true"></button>
            </div>
            <div class="rl-modal-body js-loginWrap">
                <div class="clearfix">	
                    <div class="l-left-wrap l">
                        <form id="sign-form" autocomplete="off">
                            <p class="rlf-tip-globle color-red" id="signin-globle-error"></p>
                            <div class="rlf-group pr" >
                                <input id="email" value="" maxlength="37" name="email" data-validate="require-email" autocomplete="off" class="xa-emailOrPhone ipt ipt-email js-own-name" placeholder="请输入登录邮箱/手机号" type="text">
                                <p class="rlf-tip-wrap errorHint color-red" data-error="请输入正确的邮箱或手机号"></p>
                            </div>
                            <div class="rlf-group  pr" >
                                <input id="password" name="password" data-validate="require-password" class="ipt ipt-pwd js-loginPassword js-pass-pwd" placeholder="6-16位密码，区分大小写，不能用空格" maxlength="16" autocomplete="off" type="password">
                                <p class="rlf-tip-wrap errorHint color-red " data-error="请输入6-16位密码，区分大小写，不能使用空格！"></p>
                            </div>
                            <div class="rlf-group clearfix form-control js-verify-row hide" >
                                <input id="verify" name="verify" class="ipt ipt-verify l" data-validate="require-string" data-callback="checkverity" maxlength="4" data-minlength="4" placeholder="请输入验证码" type="text">
                                <!--<a href="javascript:void(0)" hidefocus="true" class="verify-img-wrap js-verify-refresh"></a>	
                                <a href="javascript:void(0)" hidefocus="true" class="icon-refresh js-verify-refresh"></a>-->
                                <canvas width="70" height="40" id="canvas"></canvas>
                                <p class="rlf-tip-wrap errorHint color-red" data-error="请输入正确验证码"></p>
                            </div>
                            <div class="rlf-group rlf-appendix form-control  clearfix" id="forget">
                                <label for="auto-signin" class="rlf-autoin l" hidefocus="true"><input checked="checked" class="auto-cbx" id="auto-signin" type="checkbox">下次自动登录</label>		
                                <a href="/user/newforgot" class="rlf-forget r" target="_blank" hidefocus="true">忘记密码 </a>	
                            </div>
                            <div class="rlf-group clearfix">
                                <input id="signchange" value="登录" hidefocus="true" class="btn-red btn-full xa-login" type="button">
                            </div>	
                        </form>
                    </div>	
                </div>	
            </div>
            <div class="rl-model-footer">
                <div class="pop-login-sns clearfix">
                    <span class="l " style="color:#666">其他方式登录</span>
                    <a href="javascript:void(0)" hidefocus="true" data-login-sns="/passport/user/tplogin?tp=weibo" class="pop-sns-weibo r mr60"><i class="icon-weibo"></i></a>
                    <a href="javascript:void(0)" hidefocus="true" data-login-sns="/passport/user/tplogin?tp=weixin" class="pop-sns-weixin r"><i class="icon-weixin"></i></a>
                    <a href="javascript:void(0)" hidefocus="true" data-login-sns="/passport/user/tplogin?tp=qq" class="pop-sns-qq r"><i class="icon-qq"></i></a>
                </div>
                <div class="erweima xa-showQrcode"></div>
            </div>'
?>
