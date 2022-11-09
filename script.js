const data = [
	{
		title: "Hitler’s Pink Triangles",
		time: [1933, 1945],
		region: ["europe"],
		keyword: ["germany", "holocaust", "europe", "nazi", "pink triangle", "paragraph 175"]
	},

	{
		title: "Involuntary Commitment",
		time: [1935, 1974],
		region: ["europe"],
		keyword: ["england", "cure", "europe", "commitment", "institutionalization", "hospitalization"]
	},

	{
		title: "Immigration Policy",
		time: [1950, 1970],
		region: ["americas"],
		keyword: ["united states", "americas", "immigration", "deportation", "immigration and nationality act"]
	},

	{
		title: "AIDS Epidemic",
		time: [1970, 1990],
		region: ["americas"],
		keyword: ["United States", "Americas", "AIDS", "GRID", "Disease", "hospitalization"]
	},

	{
		title: "Queer Homelessness",
		time: [1980, 2022],
		region: ["americas", "europe", "asia", "africa"],
		keyword: ["Familial rejection", " housing", "foster system"]
	},

	{
		title: "Conversion Efforts",
		time: [1970, 2022],
		region: ["americas"],
		keyword: ["Conversion camps", "conversion therapy", "sexual reeducation"]
	},


	{
		title: "Modern Legislation",
		time: [1980, 2022],
		region: ["americas", "africa"],
		keyword: ["United States", "Africa", "illegal", "imprisonment", "death penalty"]
	}
]

function generate(record, index) {
	return `
		<div class="col-12 col-sm-6 col-md-4 col-lg-3">
				<div class="card h-100">
					<img class="card-img-top" alt="Photo of ${record.title}" src="https://via.placeholder.com/500">
					
					<div class="card-body d-flex flex-column">
						<h5 class="card-title">${record.title}</h5>
						<p class="card-text">Occurred in ${formatRegion(record.region)} from ${record.time[0]} to ${record.time[1]}.</p>
						
						<button type="button" class="btn btn-primary w-100 mt-auto" data-bs-toggle="modal" data-bs-target="modal-${index}">Read More</button>
						
						<div class="modal fade" id="modal-${index}" tabindex="-1" aria-labelledby="modal-label-${index}" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="modal-label-${index}">${record.title}</h5>
										<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									
									<div class="modal-body">
										You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Jaguar shark! So tell me - does it really exist? Do you have any idea how long it takes those cups to decompose. They're using our own satellites against us. And the clock is ticking.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	`;
}

function generateAll() {
	const container = document.querySelector('#research-container');

	container.innerHTML = '';

	data.forEach((record, index) => {
		container.innerHTML += generate(record, index);
	});

	makeModals();
}

function search(value) {
	const container = document.querySelector('#research-container');

	container.innerHTML = '';

	const match = []
	const intVal = parseInt(value);

	data.forEach((record, index) => {
		if (isNaN(value) && record.title.toLowerCase().includes(value.toLowerCase())) {
			match[index] = record;
		}

		if (!isNaN(intVal) && ((record.time[0] <= intVal) && (intVal <= record.time[1]))) {
			match[index] = record;
		}

		record.region.forEach(region => {
			if (isNaN(value) && region.toLowerCase().includes(value.toLowerCase())) {
				match[index] = record;
			}
		});

		record.keyword.forEach(keyword => {
			if (isNaN(value) && keyword.toLowerCase().includes(value.toLowerCase())) {
				match[index] = record;
			}
		});
	});

	console.log(match);

	match.forEach((record, index) => {
		container.innerHTML += generate(record, index);
	});

	makeModals();
}

function makeModals() {
	let modals = document.querySelectorAll('.modal');
	let triggers = document.querySelectorAll('[data-bs-toggle="modal"]')

	modals.forEach((modal, index) => {
		let element = new bootstrap.Modal(modal, {});
		let trigger = triggers[index];

		trigger.addEventListener('click', () => {
			showModal(element);
		});
	});
}

function showModal(element) {
	element.show();
}

// https://javarevisited.blogspot.com/2016/03/how-to-convert-array-to-comma-separated-string-in-java.html#axzz7RKzT9pTm
function formatRegion(regions) {
	let result = '';

	regions.forEach(region => {
		result += capitalizeFirstLetter(region) + ', ';
	});

	result = result.slice(0, result.length - 2);

	return result;
}

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

generateAll();