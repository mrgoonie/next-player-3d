
export default TLoader = {
  loadFile: function (url, options) {

    options = options != undefined ? options : {};

    var onProgress = options.hasOwnProperty("onProgress") ? options['onProgress'] : null;
    var onComplete = options.hasOwnProperty("onComplete") ? options['onComplete'] : null;
    var onError = options.hasOwnProperty("onError") ? options['onError'] : null;
    var responseType = options.hasOwnProperty("responseType") ? options['responseType'] : 'text';
    // var onCheckConnection = options.hasOwnProperty("onCheckConnection") ? options['onCheckConnection'] : null;

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    // req.responseType = 'blob';
    // req.responseType = 'text';
    req.responseType = responseType;

    var downloaded = 0;
    // var fastConnection = true;

    req.onprogress = function (e) {
      var progress = e.loaded / e.total;
      // console.log(e.loaded);
      downloaded = e.loaded;
      // console.log(progress);
      if (onProgress != null) onProgress(progress);
    };


    req.onreadystatechange = function () {
      // console.log(req.readyState);

      if (req.readyState == 2) {
        // response headers received
        // var sec = 1;

        // var kps = 0;

        // if (fastConnection) {
        //     TweenMax.delayedCall(sec, function () {
        //         kps = (downloaded / sec / 1024);
        //         // swal.fire("" + downloaded + " - " + kps);

        //         if (kps < 500) {
        //             pInGame.SPEED = pInGame.LOW_2MB;
        //             req.abort();
        //             pInGame.startLoadedVideoBeforePlay();
        //         }
        //     })
        // }
      }

      if (req.readyState == 3) {
        // loading
      }
      if (req.readyState == 4) {
        // request finished
      }
    };

    req.onload = function () {

      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          // console.log(req.response);
          if (onComplete != null) onComplete(req.response);
          return;
        }
      }

      if (onError != null) onError('Network error ' + this.status);

    };
    // req.onload = function () {
    //     // Onload is triggered even on 404
    //     // so we need to check the status code
    //     console.log("onload");
    //     if (this.status === 200) {
    //         var blob = this.response;
    //         var vid = URL.createObjectURL(blob);
    //         console.log(req.responseText);
    //         // Video is now downloaded
    //         //   video.src = vid;
    //         if (onComplete != null) onComplete(blob);
    //     } else {
    //         if (onError != null) onError('Network error ' + this.status);
    //     }
    // };

    req.onerror = function (err) {
      // Error
      console.log(err);
      if (onError != null) onError('Loading error');
    };

    req.send();
  },

  loadMultiFile: function (urls, options) {

    options = options != undefined ? options : {};

    var onProgress = options.hasOwnProperty("onProgress") ? options['onProgress'] : null;
    var onComplete = options.hasOwnProperty("onComplete") ? options['onComplete'] : null;
    var onError = options.hasOwnProperty("onError") ? options['onError'] : null;
    var maxQueue = options.hasOwnProperty("maxQueue") ? options['maxQueue'] : 5;

    var currentQueueCount = 0
      , currentIdLoaded = 0;

    if (urls.length == 0 || urls == null) {
      onComplete();
    }

    if (urls.length < maxQueue) {
      //length < maxQueue
      for (let i = 0; i < urls.length; i++) {
        const item = urls[i];
        this.loadFile(item,
          {
            onProgress: onProgress,
            onError: onError,
            onComplete: onComplete,
          });
      }
    } else {
      //load per [maxQueue] each
      loadedInQueue();
    }

    function loadedInQueue() {
      //
      if (currentIdLoaded < urls.length) {

        if (currentQueueCount < maxQueue) {

          currentQueueCount++;

          var currentItemLoaded = urls[currentIdLoaded];
          currentIdLoaded++;

          TLoader.loadFile(currentItemLoaded,
            {
              onComplete: function (blob) {

                currentQueueCount--;

                if (currentIdLoaded >= urls.length && currentQueueCount == 0) {
                  _onComplete();
                } else {
                  loadedInQueue();
                };
              },
              onProgress: _onProgress,
              onError: _onError,
            });

          loadedInQueue();
        }
      }
    }


    function _onProgress(progress) {
      var precent = ((currentIdLoaded - 1) / urls.length) + (progress * (1 / urls.length))
      if (onProgress) onProgress(precent);
    }

    function _onError(errorString) {
      if (onError) onError(errorString);
    }

    function _onComplete() {
      if (onComplete) onComplete();
    }


  },

  showPopupPoorConnection: function () {
    swal.fire({
      title: "Kết nối của bạn không ổn định",
      text: 'Vui lòng tải lại trang',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tải lại trang!',
      showCancelButton: true,
      cancelButtonText: 'Về trang chủ!',
      cancelButtonColor: '#FF9500',
    }).then((result) => {
      if (result.value)
        location.reload();
      else
        location.replace(basePath)
    })
  },
}