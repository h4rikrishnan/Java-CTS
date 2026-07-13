package com.cognizant.springlearnExcercise5.service;

import com.cognizant.springlearnExcercise5.Country;
import com.cognizant.springlearnExcercise5.CountryList;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class CountryService {

    public Country getCountry(String code) {

        try (ClassPathXmlApplicationContext context =
                     new ClassPathXmlApplicationContext("country.xml")) {

            CountryList list = context.getBean("countryList", CountryList.class);

            for (Country country : list.getCountryList()) {

                if (country.getCode().equalsIgnoreCase(code)) {
                    return country;
                }
            }

            return null;
        }
    }
}