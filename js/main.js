// Бутон за връщане най-горе в страницата

$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000, 'easeInOutExpo');
    $('.back-to-top').clear();
    return false;
});

// Увеличане на броя продукти в количката

$('.quantity button').on('click', function() {
    const btn = $(this);
    const val = btn.parent().parent().find('input').val();
    if (btn.hasClass('btn-plus')) {
        var valNew = parseFloat(val) + 1;
    } else {
        if (val > 0) {
            var valNew = parseFloat(val) - 1;
        } else {
            valNew = 0;
        }
    }
    btn.parent().parent().find('input').val(valNew);
});

// Снежинки на канвас

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var snowflakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    snowflakeCount = 250,
    mX = -100,
    mY = -100

canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < snowflakeCount; i++) {
        var snowflake = snowflakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = snowflake.x,
            y2 = snowflake.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            snowflake.velX -= deltaV * xcomp;
            snowflake.velY -= deltaV * ycomp;

        } else {
            snowflake.velX *= .98;
            if (snowflake.velY <= snowflake.speed) {
                snowflake.velY = snowflake.speed
            }
            snowflake.velX += Math.cos(snowflake.step += .05) * snowflake.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + snowflake.opacity + ")";
        snowflake.y += snowflake.velY;
        snowflake.x += snowflake.velX;

        if (snowflake.y >= canvas.height || snowflake.y <= 0) {
            reset(snowflake);
        }


        if (snowflake.x >= canvas.width || snowflake.x <= 0) {
            reset(snowflake);
        }

        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(snow);
};

function reset(snowflake) {
    snowflake.x = Math.floor(Math.random() * canvas.width);
    snowflake.y = 0;
    snowflake.size = (Math.random() * 3) + 2;
    snowflake.speed = (Math.random() * 1) + 0.5;
    snowflake.velY = snowflake.speed;
    snowflake.velX = 0;
    snowflake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < snowflakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        snowflakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            angle: 180,
            opacity: opacity
        });
    }

    snow();
};

// canvas.addEventListener("mousemove", function(e) {
//     mX = e.clientX,
//     mY = e.clientY
// });

init();