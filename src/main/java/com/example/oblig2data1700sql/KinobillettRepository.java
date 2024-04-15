package com.example.oblig2data1700sql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KinobillettRepository {
    @Autowired
    private JdbcTemplate db;

    public void lagreKinobillett (Kinobillett kinobillett) {
        String sql = "INSERT into Kinobillett (filmer, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, kinobillett.getFilmer(),kinobillett.getAntall(),kinobillett.getFornavn(),kinobillett.getEtternavn(),kinobillett.getTelefonnr(),kinobillett.getEpost());
    }

    public List<Kinobillett> hentAlleKinobilletter() {
        String sql = "SELECT  * FROM Kinobillett";
        List<Kinobillett> alleKinobilletter = db.query(sql, new BeanPropertyRowMapper(Kinobillett.class));
        return alleKinobilletter;
    }

    public void slettAlleKinobilletter() {
        String sql = "DELETE FROM Kinobillett";
        db.update(sql);
    }
}
