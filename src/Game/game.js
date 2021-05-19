/* eslint-disable */
export default function(rootEl){
	const sin = Math.sin;
	const cos = Math.cos;
	const abs = Math.abs;
	const degtorad = Math.PI / 180;
	const radtodeg = 180 / Math.PI;

	let STH;
	let GAME;

	let ANG_SPD = 0.1;
	let MOV_SPD = 7;

	let score;
	let scoreDisplay
	let pl, map;
	let jdegree, jmove, jchanged;
	let carts = [];
	let blocks = [];
	let ap;
	let dropoff;
	let cartsCollected = 0;
	let cartsCollectedImg=[], cartsCollectedBlock=[]
	let cartOverflowDisplay, cartOverflowDisplay2,cartOverflowDisplay3
	const done = new Set()

	const CONF = {
		type: Phaser.AUTO,
		width: 1920,
		height: 1080,
		scale: {
			mode: Phaser.Scale.FIT,
			parent: "game",
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		physics: {
			default: "matter",
			matter: {
				// debug: true,
				gravity: false,
				setBounds: {
					x: 0,
					y: 0,
					width: 1920,
					height: 1080,
				},
				friction: 0,
			},
		},
		fps: {
			target: 30,
		},
		scene: {
			preload: preload,
			create: create,
			update: update,
		},
	};
	GAME = new Phaser.Game(CONF);

	let mg

	mg = nipplejs.create({
		zone:rootEl,
		size: 70,
		mode: "dynamic",
		color: "red",
	});
	mg.on("move", function (_, { angle: { radian }, force }) {
		//angles: right 0, up 90
		radian = radian - ((radian + Math.PI / 16) % (Math.PI / 8)) + Math.PI / 16;
		for (; radian > Math.PI; ) {
			radian -= Math.PI * 2;
		}
		radian = -radian;
		jdegree = radian;
		jmove = force > 0.1;
		jchanged = 2;
	});
	mg.on("end", function () {
		jmove = false;
		jdegree = pl.angle;
		jchanged = 2;
	});

	function preload() {
		this.load.image("map", "./cart/src/assets/map.png");
		this.load.image("cart", "./cart/src/assets/cart.png");
		this.load.image("cart0", "./cart/src/assets/cart0.png");
		this.load.image("block", "./cart/src/assets/block.png");
		this.load.image("redpx", "./cart/src/assets/redpx.png");
	}

	function addBlock(x, y, w, h) {
		const it = {
			o: STH.matter.add
				.image(x, y, "block", null, { isStatic: true })
				.setScale(w, h)
				.setCollisionCategory(1)
				.setAlpha(0),
			x0: x - w / 2,
			x1: x + w / 2,
			y0: y - h / 2,
			y1: y + h / 2,
		};
		blocks.push(it);
		return it;
	}

	function create() {
		STH = this;
		map = this.add.image(0, 0, "map");
		map.setOrigin(0, 0);
		addBlock(368, 93, 52, 186);
		addBlock(249, 438, 251, 78);
		addBlock(249, 678, 251, 78);
		addBlock(249, 912, 251, 78);
		addBlock(855, 247, 451, 99);
		addBlock(855, 488, 451, 99);
		addBlock(855, 726, 451, 99);
		addBlock(1457, 248, 446, 99);
		addBlock(1457, 488, 446, 99);
		addBlock(1457, 736, 446, 90);
		addBlock(865, 1036, 424, 90);
		addBlock(1604, 1036, 700, 90);
		addBlock(1870, 900, 80, 200);
		addBlock(1870, 620, 80, 290);
		addBlock(1874, 128, 85, 230);
		pl = this.matter.add
			.image(50, 50, "cart0")
			.setCollisionCategory(2)
			.setScale(0.1);
		spawnCart();
		displayScore();
		initQuest()
	}

	async function initQuest(){
		for(;;){
			let i
			for(;!i||done.has(i); i=Math.ceil(Math.random()*QUESTS.length)){}
			--i
			const txt1 = STH.add.text(1000,5,QUESTS[i].msg, {font:'36px Arial Black',fill: '#000'})
			const scoreInc = await new Promise(res=>{
				QUESTS[i].init(res)
			})
			txt1.destroy()
			const txt2 = STH.add.text(1000,5,`Отлично! Получи ${scoreInc} очков`, {font:'36px Arial Black',fill: '#000'})
			setScore(score+scoreInc)
			await new Promise(res=>setTimeout(res, 5000))
			txt2.destroy()
			done.add(i)
			if(done.size >=2){
				exitGame()
				return
			}
			if(done.size === QUESTS.length){
				STH.add.text(1000,5,'Задания закончились', {font:'36px Arial Black',fill: '#000'})
				return
			}
		}
	}

	function displayScore(){
		if(!STH){
			return
		}
		if(scoreDisplay){
			scoreDisplay.destroy()
		}
		scoreDisplay = STH.add.text(410,5,'Баллы: '+score, {font:'36px Arial Black',fill:'#000'})
	}

	function clearCartsCollectedDisplay(){
		for(let i=0; i<cartsCollectedImg.length; ++i){
			cartsCollectedImg[i].destroy()
			blocks.splice(blocks.indexOf(cartsCollectedBlock[i]),1)
			cartsCollectedBlock[i].o.destroy()
		}
		cartsCollectedImg=[]
		cartsCollectedBlock=[]
	}
	function addCartsCollected(n) {
		cartsCollected += n;
		let limit = (cartsCollected-1)%27+1
		clearCartsCollectedDisplay()
		for (let i = 0; i < limit; ++i) {
			cartsCollectedImg.push(STH.add.image(30 + 35 * (i%9), 30+50*Math.floor(i/9), "cart").setScale(0.1));
			cartsCollectedBlock.push(addBlock(30 + 35 * (i%9),
				30+50*Math.floor(i/9),
				70,
				60
				))
		}
	}

	function mkDropoff() {
		dropoff = STH.matter.add
			.image(184, 93, "block")
			.setAlpha(0)
			.setScale(368,186)
			.setCollidesWith(2)
			.setOnCollideWith(pl, function () {
				setScore(score + 10 * carts.length);
				carts.forEach((it) => it.destroy());
				addCartsCollected(carts.length);
				carts = [];
				dropoff.destroy();
				dropoff = null;
				pl.setTexture('cart0')
				if(cartOverflowDisplay){
					cartOverflowDisplay.destroy()
					cartOverflowDisplay=null
					cartOverflowDisplay2.destroy()
					cartOverflowDisplay2=null
					// cartOverflowDisplay3.destroy()
					// cartOverflowDisplay3=null
					spawnCart()
				}
			});
	}

	function update() {
		let x, y, x0, y0, a0, dx, dy;
		if (jmove) {
			const a = pl.angle * degtorad;
			let av = 0;
			if (abs(ap - jdegree) < ANG_SPD) {
				av = 0;
				pl.angle = jdegree * radtodeg;
			} else {
				let da = jdegree - a;
				if (da >= Math.PI) {
					da -= Math.PI * 2;
				} else if (da < -Math.PI) {
					da += Math.PI * 2;
				}
				av = ANG_SPD * Math.sign(da);
			}
			pl.setAngularVelocity(av);
			x = MOV_SPD * cos(a);
			y = MOV_SPD * sin(a);
			pl.setVelocity(x, y);
			ap = a;
		} else {
			pl.setAngularVelocity(0);
			pl.setVelocity(0);
		}
		x = pl.x;
		y = pl.y;
		let vel = Math.sqrt(
			pl.body.velocity.x * pl.body.velocity.x +
			pl.body.velocity.y * pl.body.velocity.y
		);
		for (let i = 0; i < carts.length; ++i) {
			x0 = carts[i].x;
			y0 = carts[i].y;
			dx = x - x0;
			dy = y - y0;
			a0 = Math.atan2(dy, dx);
			carts[i].angle = a0 * radtodeg;
			if (Math.sqrt(dx * dx + dy * dy) > (carts[i+1] ? 70 : 85)) {
				vel *= Math.sqrt(dx * dx + dy * dy) / (carts[i+1] ? 50 : 65);
			}
			if (Math.sqrt(dx * dx + dy * dy) > (carts[i+1] ? 50 : 65)) {
				carts[i].setVelocity(vel * cos(a0), vel * sin(a0));
			} else {
				carts[i].setVelocity(0);
			}
			x = x0;
			y = y0;
		}
		--jchanged;
	}

	function spawnCart() {
		let x, y;
		let bl = [...blocks, {x0:550, y0:605, x1:610, y1:665}, {x0:0,y0:0,x1:374,y1:186}]
		outer: for (;;) {
			x = Math.random() * 1840 + 40;
			y = Math.random() * 1000 + 40;
			for (let { x0, y0, x1, y1 } of bl) {
				if (x0 <= x + 40 && x1 >= x - 40 && y0 <= y + 40 && y1 >= y - 40) {
					continue outer;
				}
			}
			break;
		}
		const it = STH.matter.add
			.image(x, y, "cart")
			.setScale(0.1)
			.setCollisionCategory(8)
			.setCollidesWith(2);
		it.setOnCollideWith(pl, function () {
			const { x, y, angle } = pl;
			pl.x = it.x;
			pl.y = it.y;
			pl.angle = it.angle;
			addFollower(x, y, angle);
			it.destroy();
			if(carts.length < 9){
				spawnCart();
			}else{
				cartOverflowDisplay = STH.add.image(184, 93, 'redpx', null).setScale(368, 186).setAlpha(0.3)
				cartOverflowDisplay2 = STH.add.text(178, 60, '!', {font:'72px Arial Black',fill:'#f00'})
				// cartOverflowDisplay3 = STH.add.text(410,45,'Отвези тележки на стоянку!', {font:'36px Arial Black',fill:'#000'})
			}
		});
	}

	function addFollower(x, y, a) {
		let img = 'cart'
		let first = !(carts && carts.length)
		if(first){
			img = 'cart0'
			pl.setTexture('cart')
		}
		const it = STH.matter.add
			.image(x, y, img)
			.setScale(0.1)
			.setAngle(a)
			.setCollisionCategory(4)
			.setCollidesWith(1);
		setScore(score + 2);
		carts = [it, ...carts];
		if (carts.length > 0 && !dropoff) {
			mkDropoff();
		}
	}

	function setScore(mew) {
		score = mew;
		displayScore()
	}

	setScore(0);

	const QUESTS = [
		{
			msg:'Соберешь 1 ряд тележек?',
			init: (succeed)=>{
				clearCartsCollectedDisplay()
				cartsCollected = 0
				addCartsCollected(0)
				const addCartsCollectedOld = addCartsCollected
				addCartsCollected = (...args)=>{
					addCartsCollectedOld(...args)
					if(cartsCollected>=9){
						addCartsCollected = addCartsCollectedOld
						succeed(20)
					}
				}
			}
		},
		{
			msg:'Соберешь 2 ряда тележек?',
			init: (succeed)=>{
				clearCartsCollectedDisplay()
				cartsCollected = 0
				addCartsCollected(0)
				const addCartsCollectedOld = addCartsCollected
				addCartsCollected = (...args)=>{
					addCartsCollectedOld(...args)
					if(cartsCollected>=18){
						addCartsCollected = addCartsCollectedOld
						succeed(30)
					}
				}
			}
		},
		{
			msg:'Соберешь 3 ряда тележек?',
			init: (succeed)=>{
				clearCartsCollectedDisplay()
				cartsCollected = 0
				addCartsCollected(0)
				const addCartsCollectedOld = addCartsCollected
				addCartsCollected = (...args)=>{
					addCartsCollectedOld(...args)
					if(cartsCollected>=27){
						addCartsCollected = addCartsCollectedOld
						succeed(40)
					}
				}
			}
		},
		{
			msg:'Сколько тележек соберешь за минуту?',
			init: (succeed)=>{
				let i=0
				const addFollowerOld = addFollower
				addFollower = (...args)=>{
					addFollowerOld(...args)
					++i
				}
				let t=60
				let text
				const interval = setInterval(()=>{
					--t
					if(text){
						text.destroy()
					}
					if(t<0){
						clearInterval(interval)
						succeed(i*4)
					}else{
						text = STH.add.text(1000,40,`Осталось: ${t}`, {font:'36px Arial Black',fill: t>10 ? '#000' : '#a00'})
					}
				},1000)
			}
		},
	]

	let resolve, reject
	let p = new Promise((succ,fail)=> {
		resolve = succ
		reject = fail
	})

	function exitGame(){
		exitGame = function(){}
		rootEl.removeEventListener('fullscreenchange',onFsChange)
		GAME.destroy()
		if(screen.orientation && screen.orientation.unlock){
			screen.orientation.unlock()
		}
		rootEl.hidden = true
		document.exitFullscreen()
		resolve({score:score, quests:done.size})
	}

	function onFsChange(){
		if(document.fullscreenElement !== rootEl){
			exitGame()
		}
	}
	rootEl.addEventListener('fullscreenchange',onFsChange)

	return function(){
		const el = rootEl
		const rfs = el.requestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullScreen || el.msRequestFullscreen;
		el.hidden=false
		rfs.call(el,{navigationUI:'hide'})
			.then(()=>{
				if(screen.orientation){
					return screen.orientation.lock('landscape-secondary')
						.catch(err=>{
							// STH.add.text(0,50,`E: ${err.message}`,{font:'54px Arial Black',fill:'#000'})
							console.error("Failed to lock orientation",err)
							// reject('Error: can not lock orientation')
						})
				}
			})
			.catch(e=>{
				console.error(e)
				reject('Error: can not enter fullscreen')
			})
		return p
	}
}