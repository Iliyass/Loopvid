import _ from 'lodash';

const deepDifference = function deepDifference (object, base) {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	const objectChanges = changes(object, base);
	
	if(_.keys(objectChanges).length === 0) return false;

	return objectChanges
}

export default {
  deepDifference
}