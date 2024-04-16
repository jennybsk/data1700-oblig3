package com.example.oblig2data1700sql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class KinobillettController {
    @Autowired
    private KinobillettRepository rep;

    @PostMapping("/lagreKinobillett")
    public void lagreKinobillett(Kinobillett kinobillett) {

        rep.lagreKinobillett(kinobillett);
    }

    @GetMapping("/hentAlle")
    public List<Kinobillett> hentAlle() {

        return rep.hentAlleKinobilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {

        rep.slettAlleKinobilletter();
    }
}
