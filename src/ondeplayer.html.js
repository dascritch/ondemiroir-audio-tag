
var cpu_template= `
<div class="{{classname}}-cover {{classname}}-nosmall">
	<img src="{{poster}}" alt="{{cover}}" />
</div>
<div class="{{classname}}-pagemain">
	<div class="{{classname}}-loading">{{svg:loading}}</div>
	<a class="{{classname}}-play">{{svg:play}}</a>
	<a class="{{classname}}-pause">{{svg:pause}}</a>
	<div class="{{classname}}-about">
		<div class="{{classname}}-titleline">
			<div class="{{classname}}-title"><a href="{{canonical}}" class="{{classname}}-canonical" title="{{title}}">{{title}}</a></div>
			<a class="{{classname}}-elapse">…</a>
		</div>
		<div class="{{classname}}-line">
			<div class="{{classname}}-time">
				<div class="{{classname}}-loadingline"></div>
				<div class="{{classname}}-elapsedline"></div>
			</div>
		</div>
	</div>
	<a class="{{classname}}-actions">{{svg:share}}</a>
</div>
<div class="{{classname}}-pageshare">
	<div class="{{classname}}-share">
		<a href="#" target="social" class="{{classname}}-twitter {{classname}}-nosmall" title="{{twitter}}">{{svg:twitter}}<span>{{twitter}}</span></a>
		<a href="#" target="social" class="{{classname}}-facebook {{classname}}-nosmall" title="{{facebook}}">{{svg:facebook}}<span>{{facebook}}</span></a>
		<a href="#" target="social" class="{{classname}}-email" title="{{email}}">{{svg:email}}<span>{{e-mail}}</span></a>
		<a href="{{playlister}}" target="onde_miroir_player" class="{{classname}}-playlist" title="{{playlist}}">{{svg:play}}<span>{{playlist}}</span></a>
		<a href="#" target="social" class="{{classname}}-link" title="{{download}}">{{svg:download}}<span>{{download}}</span></a>
		<a class="{{classname}}-back" title="{{back}}">{{back}}</a>
	</div>
</div>
<time class="{{classname}}-popup">--:--</time>
`
export default cpu_template;
