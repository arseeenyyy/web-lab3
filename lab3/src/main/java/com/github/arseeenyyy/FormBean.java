package com.github.arseeenyyy;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.util.Date;

import com.github.arseeenyyy.utils.*;

@Named("formBean")
@RequestScoped
public class FormBean {

    @Inject
    private DatabaseService databaseService;

    @Inject
    private ResultBean resultBean;

    public void processForm(Point point) {
        long startTime = System.currentTimeMillis();
        boolean isHit = Checker.isHit(point.getX(), point.getY(), point.getR());
        point.setIsHit(isHit);
        point.setCreatedAt(new Date());
        point.setExecutionTime(System.currentTimeMillis() - startTime);

        databaseService.addPoint(point);
        resultBean.addResult(point);
    }
}