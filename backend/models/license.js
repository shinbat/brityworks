module.exports = (sequelize, DataTypes) => {
	const License = sequelize.define('License', {
		type: {
			type: DataTypes.STRING(40),
			allowNull: false,	
		},
		quantity: {
			type: DataTypes.STRING(20),
			allowNull: false,		
		},
		applyDt: {
			type: DataTypes.DATEONLY,
			// allowNull: false,	
		},
		issueDt: {
			type: DataTypes.DATEONLY,
			// allowNull: false,	
		},
		expireDt: {
			type: DataTypes.DATEONLY,
			// allowNull: false,	
		},
		status: {
			type: DataTypes.STRING(4),
			// allowNull: false,	
		},
		applicant: {
			type: DataTypes.STRING(10),
			// allowNull: false,	
		},
		licenseFile: {
			type: DataTypes.STRING(40),
			// allowNull: false,	
		},
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});

	return License;
};