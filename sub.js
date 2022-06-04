			// More API functions here:
			// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

			// the link to your model provided by Teachable Machine export panel
			const URL = 'https://teachablemachine.withgoogle.com/models/UR710TVEf/';

			let model, webcam, labelContainer, maxPredictions;

			// Load the image model and setup the webcam
			async function init() {
				const modelURL = URL + 'model.json';
				const metadataURL = URL + 'metadata.json';

				// load the model and metadata
				// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
				// or files from your local hard drive
				// Note: the pose library adds "tmImage" object to your window (window.tmImage)
				model = await tmImage.load(modelURL, metadataURL);
				maxPredictions = model.getTotalClasses();

				// append elements to the DOM

				labelContainer = document.getElementById('label-container');
				for (let i = 0; i < maxPredictions; i++) {
					// and class labels
					labelContainer.appendChild(document.createElement('div'));
				}
			}

			// run the webcam image through the image model
			async function predict() {
				// predict can take in an image, video or canvas html element
            // predict can take in an image, video or canvas html element
            var image = document.getElementById("face-image")
            const prediction = await model.predict(image, false);
			prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
				console.log(prediction[0].className);
				var resultMessege;
				switch(prediction[0].className) {
  				case "알엠":
   					resultMessege = "RM과 닮음"
					break;
				case "진":
					resultMessege = "진과 닮음"
					break;
  				case "슈가":
   					 resultMessege = "슈가와 닮음"
					break;
				case "제이홉":
					resultMessege = "제이홉과 닮음"
  				case "지민":
   					resultMessege = "지민과 닮음"
					break;
				case "뷔":
					resultMessege = "뷔와 닮음"
					break;
				case "정국":
					resultMessege = "정국과 닮음"
					break;
				default:
					resultMessege = "누구와도 닮지 않음"
}
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
				}
			}
